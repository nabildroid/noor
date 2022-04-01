import {
  httpsCallable,
  Functions,
  connectFunctionsEmulator,
  getFunctions,
} from "firebase/functions";
import { emulator, firebaseApp } from "../main";
import {
  BouncingNavigation,
  FormNavigateResponse,
  FormOptions,
  FormSubmit,
  NavigateTo,
  NavigationResponse,
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
      this.updateBouncingData({ cookies: response.data.data });
    }
    return response.data;
  }

  async navigateTo(config: NavigateTo) {
    const response = await this.call<FormNavigateResponse>("navigation", {
      ...config,
      ...(this.bouncingData ?? {}),
    });

    this.updateBouncingData({
      cookies: response.data.cookies,
      from: response.data.redirected,
      weirdData: response.data.form.weirdData,
    });

    return response.data;
  }

  async formFetchOption(config: FormOptions) {
    const response = await this.call<FormNavigateResponse>("formOption", {
      ...config,
      ...(this.bouncingData ?? {}),
    });

    this.updateBouncingData({
      cookies: response.data.cookies,
      from: response.data.redirected,
      weirdData: response.data.form.weirdData,
    });

    return response.data;
  }

  async submitForm(config:FormSubmit){
    const response = await this.call<FormNavigateResponse>("formSubmit", {
      ...config,
      ...(this.bouncingData ?? {}),
    });

    this.updateBouncingData({
      cookies: response.data.cookies,
      from: response.data.redirected,
      weirdData: response.data.form.weirdData,
    });

    return response.data;
  }

  private updateBouncingData(config: Partial<BouncingNavigation>) {
    if (!this.bouncingData) {
      this.bouncingData = {
        cookies: [],
        ...config,
      };
    } else {
      this.bouncingData = {
        cookies: [
          ...new Set([
            ...(config.cookies ?? []),
            ...(this.bouncingData?.cookies ?? []),
          ]),
        ],
        from: config.from ?? this.bouncingData.from,
        weirdData: config.weirdData ?? this.bouncingData.weirdData,
      };
    }
  }


}
