import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AddPasswordView from "../pages/AddPassword";
import EditPasswordView from "../pages/EditPasswordView";
import SplashScreen from "../pages/SplashScreen";

const App = () => {
  const addNew = () => {};
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="splashScreen" element={<SplashScreen />} />
        <Route path="new" element={<AddPasswordView addNew={addNew} />} />
        <Route path="edit" element={<EditPasswordView edit={addNew} />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
