import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AddPasswordView from "../pages/AddPassword";
import EditPasswordView from "../pages/EditPasswordView";
import SplashScreen from "../pages/SplashScreen";
import { AuthClient } from "@dfinity/auth-client";
import { AuthContext } from "../context";

const App = () => {
  const [actorRestated, setActorRestated] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const { handleAuthenticated, setIIAuth, actor, vdbActor } =
    React.useContext(AuthContext);

  React.useEffect(() => {
    const runOnMounth = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        console.log("IS AUTHENTICATED");
        console.log(location.hash);
        await handleAuthenticated(authClient);
        setIIAuth(true);
        setActorRestated(true);
        navigate("/dashboard");
        return;
      } else {
        console.log("NOT AUTHENTICATED");
        navigate("/");
        return;
      }
    };

    runOnMounth();
  }, []);

  const addNew = () => {};

  if (actorRestated) {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/dashboard" element={<LandingPage />} />
          <Route path="new" element={<AddPasswordView addNew={addNew} />} />
          <Route path="edit" element={<EditPasswordView edit={addNew} />} />
        </Routes>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
        </Routes>
      </React.Fragment>
    );
  }
};

export default App;
