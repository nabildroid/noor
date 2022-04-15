import { initializeApp } from "firebase/app";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./style/index.css";


export const emulator = process.env.NODE_ENV == "development" && true;

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAJv-Cjmz_nzv5KUtRjnJiO5h0imIbSZFw",
  authDomain: "formal-ember-345513.firebaseapp.com",
  projectId: "formal-ember-345513",
  storageBucket: "formal-ember-345513.appspot.com",
  messagingSenderId: "804272565837",
  appId: "1:804272565837:web:61b7e1c24552ee748a3604",
  measurementId: "G-BZ2BGX92YX",
  databaseURL: "192.168.43.198",
});

const App = React.lazy(() => import("./app"));
const AppProvider = React.lazy(() => import("./context/appContext"));

ReactDOM.render(
  <Suspense fallback={<span></span>}>
    <AppProvider>
      <App />
    </AppProvider>
  </Suspense>,
  document.getElementById("root")
);
