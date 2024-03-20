import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AddPasswordView from "../pages/AddPassword";
import EditPasswordView from "../pages/EditPasswordView";

const App = () => {
  const addNew = () => {};
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/new" element={<AddPasswordView addNew={addNew} />} />
        <Route path="/edit" element={<EditPasswordView edit={addNew} />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
