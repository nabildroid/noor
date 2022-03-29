import React, { createContext, useEffect, useReducer } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Auth,
  onAuthStateChanged,
  connectAuthEmulator,
} from "firebase/auth";
import appAction from "../actions/appAction";
import { AppStateInit, IAppProvider } from "../models/app_model";
import Repository from "../repository";
import { emulator, firebaseApp } from "../main";
import { LoginCredential } from "../types/login_types";

export const AppContext = createContext<IAppProvider>(null!);

let auth: Auth;

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appAction, AppStateInit);

  useEffect(() => {
    auth = getAuth(firebaseApp);

    if (emulator) connectAuthEmulator(auth, "http://localhost:9099");

    return onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "login", payload: user });
      } else {
        dispatch({ type: "logout" });
      }
    });
  }, [dispatch]);

  async function login(credential: LoginCredential): Promise<boolean> {
    const { operation, data } = await Repository.instance.checkLoginInformation(
      state.loginFormParams!,
      credential
    );


    if (operation == "success") {
      signInWithEmailAndPassword(
        auth,
        credential.name + "@noor.com",
        credential.password
      )
        .catch((e) => {
          return createUserWithEmailAndPassword(
            auth,
            credential.name + "@noor.com",
            credential.password
          );
        })
        .catch((e) => {
          // todo catch this error
        });
      return true;
    }

    return false;
  }

  async function loadLoginParams() {
    const params = await Repository.instance.getLoginFormParams();

    dispatch({ type: "loginFormParams", payload: params });
  }

  async function logout() {
    dispatch({ type: "logout" });
    auth.signOut();
  }

  const values: IAppProvider = {
    ...state,
    login,
    loadLoginParams,
    logout,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
