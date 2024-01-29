import React, { useState } from "react";
import "./Styles/App.scss";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";

const App = () => {
  return (
    <>
      <Navbar />
      <Homepage />
    </>
  );
};

export default App;
