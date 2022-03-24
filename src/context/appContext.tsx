import React, { createContext, useContext, useEffect, useReducer } from "react";
import appAction from "../actions/appAction";
import {
  AppStateInit,
  IAppProvider,
  LoginCredential,
} from "../models/app_model";
import Repository from "../repository";

export const AppContext = createContext<IAppProvider>(null!);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appAction, AppStateInit);

  async function login(credential: LoginCredential) {
    
  }

  async function loadLoginParams() {
    dispatch({ type: "loading_on" });
    const params = await Repository.instance.getLoginFormParams();

    dispatch({ type: "loginFormParams", payload: params });
  }

  async function logout() {}

  const values: IAppProvider = {
    ...state,
    login,
    loadLoginParams,
    logout,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
