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
import Repository from "../repository";
import { AppContext } from "./appContext";

export const HomeContext = createContext<IHomeProvider>(null!);

const HomeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(homeAction, HomeStateInit);
  const { user, logout } = useContext(AppContext);

  const teacher = useFetchTeacher({ user });

  useEffect(() => {
    if (teacher) {
      dispatch({ type: "setTeacher", payload: teacher });
      dispatch({ type: "setRole", payload: teacher.currentRole });
    }
  }, [teacher]);

  useEffect(() => {
    const type = getTeacherType(state.currentRole);
    dispatch({ type: "setTeacherType", payload: type });
    dispatch({ type: "setTabs", payload: getTeacherTabs(type) });
    dispatch({ type: "setTab", payload: HomeTab.selectRole });
  }, [state.currentRole]);

  const getTeacherTabs = (type: TeacherType) => {
    return [
      HomeTab.save,
      HomeTab.saveAll,
      HomeTab.savedReports,
      HomeTab.savedegree,
      HomeTab.saveCustom,
      HomeTab.editSkill,
      HomeTab.saveReport,
      HomeTab.didntGet,
    ];
    if (type == TeacherType.elementery)
      return [HomeTab.saveReport, HomeTab.saveCustom];
    else if (type == TeacherType.kindergarten)
      return [HomeTab.saveCustom, HomeTab.selectRole];
    return [HomeTab.savedReports, HomeTab.saveCustom];
  };

  const getTeacherType = (currentRole?: string) => {
    if (!currentRole) return TeacherType.elementery;
    if (currentRole.includes("ابتدائية")) return TeacherType.primary;
    if (currentRole.includes("روضة")) return TeacherType.kindergarten;

    return TeacherType.elementery;
  };

  async function selectTab(tab: HomeTab) {
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
