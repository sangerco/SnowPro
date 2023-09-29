import React from "react";
import { Header, Divider, Segment, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AnonHome: React.FC = () => {
  return (
    <Container text>
      <Header as="h1" color="green">
        Welcome to SnowPro
      </Header>
      <Header as="h2" color="green">
        Your hub for ski conditions, reviews and more!
      </Header>
      <Divider />
      <Segment raised>
        <Header as="h4">
          <Link data-testid="loginLink" to="/login">
            Log In
          </Link>
        </Header>
        <Divider />
        <Header as="h4">
          <Link data-testid="registerLink" to="/register">
            Sign Up
          </Link>
        </Header>
      </Segment>
      <Divider />
      <Segment raised>
        <Header as="h4">
          <Link data-testid="skiAreasLink" to="/ski-areas">
            Find Ski Areas
          </Link>
        </Header>
      </Segment>
    </Container>
  );
};

export default AnonHome;
