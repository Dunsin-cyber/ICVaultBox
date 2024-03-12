import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./app";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider toastOptions={{ defaultOptions: { position: "top" } }}>
        <App />
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>
);
