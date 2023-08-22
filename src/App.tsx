import React from "react";
import "./App.css";
import AppRoutes from "./Routes";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  );
}

export default App;
