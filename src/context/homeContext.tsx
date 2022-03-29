import React, { createContext, useContext, useEffect, useReducer } from "react";
import homeAction from "../actions/homeAction";
import useFetchTeacher from "../hooks/useFetchTeacher";
import {
  HomeStateInit,
  HomeTab,
  IHomeProvider,
  Teacher,
  TeacherType,
} from "../models/home_model";
import { AppContext } from "./appContext";

export const HomeContext = createContext<IHomeProvider>(null!);

const HomeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(homeAction, HomeStateInit);
  const { user } = useContext(AppContext);

  const teacher = useFetchTeacher({ user });

  useEffect(() => {
    if (teacher) {
      dispatch({ type: "setTeacher", payload: teacher });
      dispatch({ type: "setRole", payload: teacher.currentRole });
    }
  }, [teacher]);

  useEffect(() => {
    console.log("changing teacher role!");
    const type = getTeacherType(state.currentRole);
    dispatch({ type: "setTeacherType", payload: type });
    dispatch({ type: "setTabs", payload: getTeacherTabs(type) });
  }, [state.currentRole]);

  const getTeacherTabs = (type: TeacherType) => {
    if (type == TeacherType.elementery)
      return [HomeTab.saveAllDegrees, HomeTab.saveReport];
    else if (type == TeacherType.kindergarten)
      return [HomeTab.saveAllDegrees, HomeTab.selectRole];
    return [
      HomeTab.saveAllDegrees,
      HomeTab.saveOneDegree,
      HomeTab.savedReports,
    ];
  };

  const getTeacherType = (currentRole?: string) => {
    if (!currentRole) return TeacherType.elementery;
    if (currentRole.includes("ابتدائية")) return TeacherType.primary;
    if (currentRole.includes("روضة")) return TeacherType.kindergarten;

    return TeacherType.elementery;
  };

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
