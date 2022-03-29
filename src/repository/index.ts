import {
  httpsCallable,
  Functions,
  connectFunctionsEmulator,
  getFunctions,
} from "firebase/functions";
import { emulator, firebaseApp } from "../main";
import {
  BouncingNavigation,
  NavigateResponse,
  NavigateTo,
} from "../types/communication_types";
import { LoginFormParams, LoginSubmissionResponse } from "../types/login_types";

export default class Repository {
  private functions: Functions;
  private static _instance?: Repository;
  private bouncingData?: BouncingNavigation;

  static get instance() {
    if (!Repository._instance) {
      Repository._instance = new Repository();
    }
    return Repository._instance!;
  }

  constructor() {
    this.functions = getFunctions(firebaseApp);
    if (emulator) {
      connectFunctionsEmulator(this.functions, "localhost", 5001);
    }
  }

  private call<R>(name: string, data?: any) {
    return httpsCallable<typeof data, R>(this.functions, name)(data);
  }

  async getLoginFormParams() {
    const response = await this.call<LoginFormParams>("signForm");

    return response.data;
  }

  async checkLoginInformation(
    params: LoginFormParams,
    info: { name: string; password: string; captcha: number }
  ) {
    const response = await this.call<LoginSubmissionResponse>("postSignForm", {
      ...params,
      ...info,
    });

    if (response.data.operation == "success") {
      this.bouncingData = {
        cookies: response.data.data,
      };
    }
    return response.data;
  }

  async navigateTo(config: NavigateTo) {
    const response = await this.call<NavigateResponse>("navigation", {
      ...config,
      ...(this.bouncingData ?? {}),
    });

    this.bouncingData = {
      ...response.data,
    };
    
    return response.data;
  }
}
