import { LoginFormParams } from "../models/app_model";
import { httpsCallable, Functions, getFunctions } from "firebase/functions";
import { firebaseApp } from "../main";
import { callables } from "../../functions/src/index";

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
  }

  private call<R>(name: callables, data?: any) {
    return httpsCallable<typeof data, R>(this.functions, name)(data);
  }

  async getLoginFormParams() {
    const response = await this.call<LoginFormParams>(callables.signForm);

    return response.data;
  }
}
