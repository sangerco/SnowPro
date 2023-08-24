import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users/Users";
import MyPage from "./components/Users/MyPage";
import LoginForm from "./components/Auth/LoginForm";
import NewUserForm from "./components/Auth/NewUserForm";
import UserPage from "./components/Users/UserPage";
import Message from "./components/Messages/Message";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<NewUserForm />} />
      <Route path="/users/:username" element={<UserPage />} />
      <Route path="/messages/:id" element={<Message />} />
    </Routes>
  );
};

export default AppRoutes;
