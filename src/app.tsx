import React, { Suspense, useContext } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Loading from "./components/loading";

import { AppContext } from "./context/appContext";
import { HomeTab } from "./models/home_model";
import DidntGet from "./views/home/didntGet";
import EditSkill from "./views/home/editSkill";
import Onboarding from "./views/home/onboarding";
import SaveAll from "./views/home/saveAll";
import SaveCustom from "./views/home/saveCustom";
import SaveDegree from "./views/home/saveDegree";
import SaveReport from "./views/home/saveReport";
import Login from "./views/login";

const Home = React.lazy(() => import("./views/home"));
const HomeProvider = React.lazy(() => import("./context/homeContext"));

function App() {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return <Loading />;
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
                <Suspense fallback={<Loading />}>
                  <HomeProvider>
                    <Home />
                  </HomeProvider>
                </Suspense>
              }
            >
              <Route path={HomeTab.save} element={<SaveAll />} />
              <Route path={HomeTab.editSkill} element={<EditSkill />} />
              <Route path={HomeTab.saveCustom} element={<SaveCustom />} />
              <Route path={HomeTab.saveCustom} element={<SaveCustom />} />

              <Route path={HomeTab.saveReport} element={<SaveReport />} />
              <Route path={HomeTab.savedegree} element={<SaveDegree />} />
              <Route path={HomeTab.didntGet} element={<DidntGet/>} />
              <Route path={HomeTab.saveAll} element={<span>Hello tab3</span>} />
              <Route
                path={HomeTab.selectRole}
                element={<span>Hello tab4</span>}
              />
              <Route
                path={HomeTab.savedReports}
                element={<span>Hello tab5</span>}
              />

              <Route index element={<Onboarding />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
