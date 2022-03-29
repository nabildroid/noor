import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase/app";

import "./style/index.css";

export const emulator = process.env.NODE_ENV && true;

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBjPAxxWuVvaCr7wXxE0nWputXZvT6bKhg",
  authDomain: "noor-a4a7d.firebaseapp.com",
  projectId: "noor-a4a7d",
  storageBucket: "noor-a4a7d.appspot.com",
  messagingSenderId: "133224766800",
  appId: "1:133224766800:web:6bfbf76b956112ad832055",
});

const App = React.lazy(() => import("./app"));
const AppProvider = React.lazy(() => import("./context/appContext"));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<span></span>}>
      <AppProvider>
        <App />
      </AppProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
