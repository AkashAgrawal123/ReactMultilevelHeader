import React, { useState } from "react";
import "./Styles/App.scss";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
// import ImageZoom from "./Components/ImageZoom";
import AxiosMockComponent from "./Mock/AxiosMockComponent";

const App = () => {
  return (
    <>
      <Navbar />
      <Homepage />
      {/* <ImageZoom /> */}
      {/* <AxiosMockComponent /> */}
    </>
  );
};

export default App;
