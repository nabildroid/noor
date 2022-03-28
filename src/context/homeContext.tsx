import React, { createContext, useContext, useEffect, useReducer } from "react";
import homeAction from "../actions/homeAction";
import useFetchTeacher from "../hooks/useFetchTeacher";
import { HomeStateInit, HomeTab, IHomeProvider } from "../models/home_model";
import { AppContext } from "./appContext";

export const HomeContext = createContext<IHomeProvider>(null!);

const HomeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(homeAction, HomeStateInit);
  const { user } = useContext(AppContext);

  const teacher = useFetchTeacher({ user });

  useEffect(() => {
    console.log(teacher);
    if (teacher) {
      dispatch({ type: "setTeacher", payload: teacher });
      dispatch({ type: "setRole", payload: teacher.currentRole });
    }
  }, [teacher]);

  function selectTab(tab: HomeTab) {
      dispatch({ type: "setTab", payload: tab });
    }
    function selectRole(role: string) {
      // todo save the role back to firestore
    dispatch({ type: "setRole", payload: role });
  }

  const values: IHomeProvider = {
    ...state,
    selectRole,
    selectTab,
  };

  return <HomeContext.Provider value={values}>{children}</HomeContext.Provider>;
};

export default HomeProvider;
