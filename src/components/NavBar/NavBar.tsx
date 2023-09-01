import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loginUser, logoutUser } from "../../redux/slices/authSlice";
import { Menu, Dropdown, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../../media/snow-pro-logo.jpg";

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
        <Image src={logo} alt={"snow-pro-logo"} size="small" />
      </Menu.Item>
      {isAuthenticated ? (
        <Menu.Menu position="right">
          <Button style={{ height: "50px" }} onClick={handleLogout}>
            Logout
          </Button>
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
