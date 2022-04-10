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
import DB from "../repository/db";
import { AppContext } from "./appContext";

export const HomeContext = createContext<IHomeProvider>(null!);

const HomeProvider: React.FC = ({ children }) => {
  console.log("creating the context!");
  const [state, dispatch] = useReducer(homeAction, HomeStateInit);
  const { user, logout } = useContext(AppContext);

  const teacher = useFetchTeacher({ user });

  useEffect(() => {
    console.log("subscribing to the task list");
    return DB.instance.subscribeToTasks(user!.uid, (task, isDeleted) => {
      console.log(task.id, isDeleted ? "deleted" : "added");
      if (isDeleted) dispatch({ type: "deleteTask", payload: task.id! });
      else {
        dispatch({ type: "addTask", payload: task });
      }
    });
  }, []);

  useEffect(() => {
    if (teacher) {
      dispatch({ type: "setTeacher", payload: teacher });
      dispatch({ type: "setRole", payload: teacher.currentRole });
      const type = getTeacherType(teacher.currentRole);
      dispatch({ type: "setTeacherType", payload: type });
      dispatch({ type: "setTab", payload: HomeTab.selectRole });
    }
  }, [teacher]);

  useEffect(() => {
    const type = getTeacherType(state.currentRole);
    dispatch({ type: "setTeacherType", payload: type });
    dispatch({ type: "setTabs", payload: getTeacherTabs(type) });
    dispatch({ type: "setTab", payload: HomeTab.selectRole });
  }, [state.currentRole]);

  const getTeacherTabs = (type: TeacherType) => {
    if (type == TeacherType.elementery)
      return [
        HomeTab.saveReport,
        HomeTab.saveCustom,
        HomeTab.editSkill,

        HomeTab.savedReports,
      ];
    else if (type == TeacherType.kindergarten)
      return [
        HomeTab.saveAll,
        HomeTab.saveCustom,
        HomeTab.editSkill,
        HomeTab.saveReport,
        HomeTab.savedReports,
      ];
    return [
      HomeTab.savedReports,
      HomeTab.saveAll,
      HomeTab.saveReport,
      HomeTab.saveCustom,
      HomeTab.editSkill,
    ];
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
