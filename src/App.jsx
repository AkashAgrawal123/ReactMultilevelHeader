import React, { useState } from "react";
import "./Styles/App.scss";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
// import ImageZoom from "./Components/ImageZoom";
import One from "./Mock/One";

const App = () => {
  return (
    <>
      <Navbar />
      <Homepage />
      {/* <ImageZoom /> */}
      {/* <One /> */}
    </>
  );
};

export default App;
