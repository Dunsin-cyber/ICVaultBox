import React, { useState } from "react";
import { Actor, Identity, ActorSubclass } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import {
  createActor,
  canisterId,
} from "../../declarations/ic_vault_box_backend";

import { useLocation, useNavigate } from "react-router-dom";
import { _SERVICE } from "../../declarations/ic_vault_box_backend/ic_vault_box_backend.did";

export const AuthContext = React.createContext<{
  Auth: any;
  actor: ActorSubclass<_SERVICE> | undefined;
  setActor: any;
  iiAuth: boolean;
  setIIAuth: any;
  handleAuthenticated: any;
  changeAuthStatus: any;
  loading: boolean;
  setLoading: any;
  symmetricKey: any;
  setSymmetricKey: any;
}>({
  Auth: undefined,
  actor: undefined,
  vdbActor: undefined,
  iiAuth: false,
  setIIAuth: undefined,
  handleAuthenticated: undefined,
  changeAuthStatus: undefined,
  loading: undefined,
  setLoading: undefined,
  symmetricKey: null,
  setSymmetricKey: undefined,
});

// const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

export const AuthProvider = ({ children }) => {
  const [actor, setActor] = useState<ActorSubclass<_SERVICE>>();
  const [iiAuth, setIIAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [symmetricKey, setSymmetricKey] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function Auth(e) {
    e.preventDefault();
    console.log("You clicked me.");
    setLoading(true);
    // trackEvent({ category: "Authentication", action: "sign-in/sign-up" });
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
      // setTour(tour_);
      if (location.pathname === "/") {
        navigate("/");
      }
      setIIAuth(true);
      setLoading(false);
    }

    const loginButton = document.getElementById("login") as HTMLButtonElement;

    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);

    const APPLICATION_NAME = "IC Vault Box";
    const APPLICATION_LOGO_URL =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJR6SAoiTMNdmt6tabURYYwvSp9XcA9IgMjw&usqp=CAU";

    const AUTH_PATH =
      "/authenticate/?applicationName=" +
      APPLICATION_NAME +
      "&applicationLogo=" +
      APPLICATION_LOGO_URL +
      "#authorize";

    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
        navigate("/dashboard");
        window.location.reload();
        setIIAuth(true);
        setLoading(false);
      },
      windowOpenerFeatures:
        `left=${window.screen.width / 2 - 525 / 2}, ` +
        `top=${window.screen.height / 2 - 705 / 2},` +
        `toolbar=0,location=0,menubar=0,width=525,height=705`,
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://nfid.one" + AUTH_PATH
          : // : process.env.LOCAL_II_CANISTER,
            `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
      // Maximum authorization expiration is 8 days
      maxTimeToLive: days * hours * nanoseconds,
    });
  }

  async function handleAuthenticated(authClient: AuthClient) {
    const identity = (await authClient.getIdentity()) as unknown as Identity;

    const whoami_actor = createActor(canisterId as string, {
      agentOptions: {
        identity,
      },
    });
    console.log(whoami_actor);
    setActor(whoami_actor);

    // Invalidate identity then render login when user goes idle
    authClient.idleManager?.registerCallback(() => {
      Actor.agentOf(whoami_actor)?.invalidateIdentity?.();
    });
  }

  const changeAuthStatus = () => {
    setIIAuth((prevState) => prevState !== prevState);
  };

  return (
    <AuthContext.Provider
      value={{
        Auth,
        actor,
        setActor,
        iiAuth,
        setIIAuth,
        handleAuthenticated,
        changeAuthStatus,
        loading,
        setLoading,
        symmetricKey,
        setSymmetricKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
