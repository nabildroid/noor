import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

const Builder = React.lazy(() => import("./builder"));
const Dashboard = React.lazy(() => import("./dashboard"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/builder"
          element={
            <Suspense fallback={<span>loading</span>}>
              <Builder />
            </Suspense>
          }
        />
        <Route
          index
          element={
            <Suspense fallback={<span>loading</span>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
