import React, { useContext } from "react";
import { Loader } from "react-feather";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import { AppContext } from "./context/appContext";
import HomeProvider from "./context/homeContext";
import { HomeTab } from "./models/home_model";
import Home from "./views/home";
import Login from "./views/login";

function App() {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
        <Loader className="w-24 h-24 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!user && (
          <>
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}

        {user && (
          <>
            <Route
              path="/"
              element={
                <HomeProvider>
                  <Home />
                </HomeProvider>
              }
            >
              <Route path={HomeTab.saveAllDegrees} element={<span>Hello tab1</span>} />
              <Route path={HomeTab.saveReport} element={<span>Hello tab2</span>} />
              <Route path={HomeTab.saveOneDegree} element={<span>Hello tab3</span>} />
              <Route path={HomeTab.selectRole} element={<span>Hello tab4</span>} />
              <Route path={HomeTab.savedReports} element={<span>Hello tab5</span>} />
              <Route index element={<Navigate to={HomeTab.selectRole} />} />

            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
