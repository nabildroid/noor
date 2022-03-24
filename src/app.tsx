import { useContext } from "react";
import { Loader } from "react-feather";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import { AppContext } from "./context/appContext";
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
            <Route path="/" element={<span>hello</span>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
