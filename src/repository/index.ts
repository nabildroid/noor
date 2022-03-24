import { LoginFormParams } from "../models/app_model";
import {
  httpsCallable,
  Functions,
  connectFunctionsEmulator,
  getFunctions,
} from "firebase/functions";
import { firebaseApp } from "../main";

export default class Repository {
  private functions: Functions;
  private static _instance?: Repository;

  static get instance() {
    if (!Repository._instance) {
      Repository._instance = new Repository();
    }
    return Repository._instance!;
  }
  constructor() {
    this.functions = getFunctions(firebaseApp);

    if (process.env.NODE_ENV && true) {
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
  ): Promise<any> {
    const response = await this.call<LoginFormParams>("postSignForm", {
      ...params,
      ...info,
    });

    return response.data;
  }
}
