import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "../src/app";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "../pages/LandingPage";

const dom = <div>ICVaultBox, Waiting for UI</div>;

const container = document.createElement("div");
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);
root.render(dom);
