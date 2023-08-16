import React, { useEffect } from "react";
import "./Home.css";
import { useAuth } from "../AuthProvider";
import { fetchUserData } from "../../redux/actions/userActions";
import { fetchAllReviewsData } from "../../redux/actions/reviewActions";
import { useAppSelector } from "../../redux/hooks";
import AnonHome from "./AnonHome";

const Home: React.FC = () => {
  const { username } = useAuth();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData(username as string);
    }
  }, [isAuthenticated, fetchUserData]);

  if (isAuthenticated) {
    return <p>logged in!</p>;
  } else {
    return <AnonHome fetchAllReviewsData={fetchAllReviewsData} />;
  }
};

export default Home;
