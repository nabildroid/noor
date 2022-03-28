import { User } from "firebase/auth";

export type AppActions =
  | {
      type: "login";
      payload: User;
    }
  | {
      type: "loginFormParams";
      payload: LoginFormParams;
    }
  | {
      type: "loading_on";
    }
  | {
      type: "loading_off";
    }
  | {
      type: "logout";
    };

export type AppState = {
  loading: boolean;
  user?: User;
  loginFormParams?: LoginFormParams;
};

export const AppStateInit: AppState = {
  loading: true,
};

export type LoginCredential = {
  name: string;
  password: string;
  captcha: number;
};
export interface IAppProvider extends AppState {
  login(credential: LoginCredential): Promise<boolean>;

  loadLoginParams(): Promise<void>;

  logout(): Promise<void>;
}

export type LoginFormParamsResponse = {
  __VIEWSTATEGENERATOR: string;
  __VIEWSTATEENCRYPTED: string;
  __EVENTVALIDATION: string;
  __VIEWSTATE: string;
  cookies: string[];
};
export interface LoginFormParams extends LoginFormParamsResponse {
  captcha: string;
}

export type LoginSubmissionResponse = {
  data: string[];
  operation: "success" | "failer";
};
