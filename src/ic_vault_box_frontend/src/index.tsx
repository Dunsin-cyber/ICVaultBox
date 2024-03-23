import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./app";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { AuthProvider } from "../context";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store} children={undefined}>
        <ChakraProvider toastOptions={{ defaultOptions: { position: "top" } }}>
          <AuthProvider children={undefined}>
            <App />
          </AuthProvider>
        </ChakraProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
