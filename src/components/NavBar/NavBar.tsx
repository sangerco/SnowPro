import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/slices/authSlice";
import { Menu, Dropdown, Button, Image } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../media/snow-pro-logo.jpg";

const NavBar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuthenticated = auth.isAuthenticated;

  const handleLogout = () => {
    dispatch(logoutUser());

    navigate("/");
  };

  return (
    <Menu inverted color="black" size="large">
      <Menu.Item header as={Link} to="/">
        <Image src={logo} alt={"snow-pro-logo"} size="small" />
      </Menu.Item>
      <Dropdown item text="Check it out" style={{ color: "goldenrod" }}>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/ski-areas" style={{ color: "green" }}>
              Ski Areas
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              to="/ski-areas/reviews/recent-reviews"
              style={{ color: "green" }}>
              Recent Reviews
            </Link>
          </Dropdown.Item>
          {isAuthenticated ? (
            <Dropdown.Item>
              <Link to="/users/all-users" style={{ color: "green" }}>
                Users
              </Link>
            </Dropdown.Item>
          ) : null}
        </Dropdown.Menu>
      </Dropdown>
      {isAuthenticated ? (
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/" style={{ color: "goldenrod" }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item onClick={handleLogout} style={{ color: "goldenrod" }}>
            Logout
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/login" style={{ color: "goldenrod" }}>
              Login
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register" style={{ color: "goldenrod" }}>
              Sign Up!
            </Link>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default NavBar;
