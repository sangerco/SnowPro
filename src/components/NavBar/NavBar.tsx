import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loginUser, logoutUser } from "../../redux/slices/authSlice";
import { Menu, Dropdown, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = auth.isAuthenticated;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Menu inverted color="black" size="large">
      <Menu.Item header as={Link} to="/">
        App Logo TBD
      </Menu.Item>
      {isAuthenticated ? (
        <Menu.Menu position="right">
          <Button onClick={handleLogout}>Logout</Button>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login">
            Login
          </Menu.Item>
          <Menu.Item as={Link} to="/register">
            Register
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default NavBar;
