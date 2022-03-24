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
import {
  AppStateInit,
  IAppProvider,
  LoginCredential,
} from "../models/app_model";
import Repository from "../repository";
import { emulator, firebaseApp } from "../main";

export const AppContext = createContext<IAppProvider>(null!);

let auth: Auth;

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appAction, AppStateInit);

  useEffect(() => {
    auth = getAuth(firebaseApp);
    if (emulator) connectAuthEmulator(auth, "http://localhost:9099");

    console.log("initnig the app context");
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("loggin in");

        dispatch({ type: "login", payload: user });
      } else {
        console.log("loggin out");
        dispatch({ type: "logout" });
      }
      console.log(user);
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
