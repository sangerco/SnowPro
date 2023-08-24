import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users/Users";
import MyPage from "./components/Users/MyPage";
import LoginForm from "./components/Auth/LoginForm";
import NewUserForm from "./components/Auth/NewUserForm";
import UserPage from "./components/Users/UserPage";
import Message from "./components/Messages/Message";
import MessageReply from "./components/Messages/MessageReply";
import MessageForm from "./components/Messages/MessageForm";
import MessageReplyForm from "./components/Messages/MessageReplyForm";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<NewUserForm />} />
      <Route path="/users/:username" element={<UserPage />} />
      <Route path="/messages/:id" element={<Message />} />
      <Route path="/messages/replies/:id" element={<MessageReply />} />
      <Route path="/messages/create-message" element={<MessageForm />} />
      <Route path="/messages/:id/reply" element={<MessageReplyForm />} />
    </Routes>
  );
};

export default AppRoutes;
