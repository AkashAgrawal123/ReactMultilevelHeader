import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { worker } from "./Mocks/browser.js";

// worker.start();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
