import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AddPasswordView from "../pages/AddPassword";
import EditPasswordView from "../pages/EditPasswordView";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
