import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages";
// import LoginPage from "./pages/login";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* <Route path="login" element={<LoginPage />} /> */}
    </Routes>
  );
};

export default Router;