import { LoginFormParams, LoginSubmissionResponse } from "../models/app_model";
import {
  httpsCallable,
  Functions,
  connectFunctionsEmulator,
  getFunctions,
} from "firebase/functions";
import { emulator, firebaseApp } from "../main";

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
  ): Promise<any> {
    const response = await this.call<LoginSubmissionResponse>("postSignForm", {
      ...params,
      ...info,
    });


    console.log(response.data);
    await this.call("navigation",{
      cookies:response.data.data,
      nav1:"المهارات",
      nav2:"إدخال نتائج الطلاب على مستوى المادة والمهارة"
    });
    return response.data;
  }


}
