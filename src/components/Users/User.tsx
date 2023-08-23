import React from "react";

interface UserProps {
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    bio?: string;
    avatar?: string;
    isAdmin: boolean;
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <li key={user.id}>
      <p>{user.id}</p>
      <p>{user.username}</p>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.email}</p>
      <p>{user.bio}</p>
      <p>{user.avatar}</p>
      <p>{user.isAdmin}</p>
    </li>
  );
};

export default User;
