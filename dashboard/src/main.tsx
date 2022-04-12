import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";

const dev = process.env.NODE_ENV == "development" && true;

if (dev) {
  axios.defaults.baseURL = "http://localhost:5050";
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
