import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { initializeApp } from "firebase/app";

import "./style/index.css";
import AppProvider from "./context/appContext";


export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBjPAxxWuVvaCr7wXxE0nWputXZvT6bKhg",
  authDomain: "noor-a4a7d.firebaseapp.com",
  projectId: "noor-a4a7d",
  storageBucket: "noor-a4a7d.appspot.com",
  messagingSenderId: "133224766800",
  appId: "1:133224766800:web:6bfbf76b956112ad832055",
});


ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
