import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users/Users";
import MyPage from "./components/Users/MyPage";
import LoginForm from "./components/Auth/LoginForm";
import NewUserForm from "./components/Auth/NewUserForm";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<NewUserForm />} />
    </Routes>
  );
};

export default AppRoutes;
