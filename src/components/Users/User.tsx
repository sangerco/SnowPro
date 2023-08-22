import React from "react";

const User = ({ user }) => {
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
