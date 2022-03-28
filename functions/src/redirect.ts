import http from "axios";
import { stringify as QueryEncode } from "querystring";
import { load, load as loadHtml } from "cheerio";
import { weird } from "./types";

import { defaultHeader, hiddenInputs, pageNameBase64 } from "./utils";

type RedirectionType =
  | "MenuItemRedirect"
  | "OperationOnMenu"
  | "SwitchUserTypeMenu"
  | "";

interface RedirectionNavigationParams {
  to: string;
  target: RedirectionType;
  weirdData?: weird;
}

interface RedirectionInitParams {
  from: string;
  cookies: string[];
}

interface RedirectionParams extends RedirectionNavigationParams {
  from: string;
  weirdData: weird;
  cookies: string[];
}

interface RedirectionResponse {
  html: string;
  weirdData: weird;
  redirected: string;
}

export default class Redirect {
  private from: string;
  private to: string;
  private weirdData: weird;
  private cookies: string[];
  private target: RedirectionType;
  private redirected: string;
  private html: string;

  private create(config: RedirectionResponse) {
    const instance = new Redirect({
      ...this,
      ...config,
    });

    return instance;
  }

  static async start(config: RedirectionInitParams) {
    const { data } = await http.get(config.from, {
      headers: defaultHeader(config.cookies),
    });

    return new Redirect({
      cookies: config.cookies,
      from: config.from,
      target: "",
      to: "",
      weirdData: {} as any,
      html: data,
      redirected: "",
    });
  }

  private constructor(config: RedirectionParams & RedirectionResponse) {
    this.from = config.from;
    this.cookies = config.cookies;

    this.target = config.target;
    this.to = config.to;

    this.weirdData = config.weirdData;
    this.html = config.html;
    this.redirected = config.redirected;
  }

  async nextIf(
    condition: (config: RedirectionResponse) => Promise<boolean>,
    treat: (config: RedirectionResponse) => Promise<RedirectionNavigationParams>
  ) {
    const response = {
      html: this.html,
      redirected: this.redirected,
      weirdData: this.weirdData,
    };
    if (await condition(response)) {
      return this.next(treat);
    }
    return this;
  }

  async next(
    treat: (config: RedirectionResponse) => Promise<RedirectionNavigationParams>
  ) {
    const navigation = await treat({
      html: this.html,
      redirected: this.redirected,
      weirdData: this.weirdData,
    });

    this.to = navigation.to;
    this.target = navigation.target;

    this.from = this.redirected || this.from;

    this.weirdData = navigation.weirdData || this.weirdData;

    return this.do();
  }

  stop(): RedirectionResponse {
    return {
      redirected: this.redirected,
      weirdData: this.weirdData,
      html: this.html,
    };
  }

  private async do() {
    const { cookies, from, to, weirdData, target } = this;
    const requestData = {
      ...weirdData,
      ctl00$hdnData_Data: "",
      ctl00$hdnData_Operation: "",
      ctl00$hdnPageName: pageNameBase64(from), // HomePage
      ctl00$hdnStopInterval: "True",
      ctl00$hdPageIDBookMarks: "",
      ctl00$hdPageControlsBookMarks: "",
      ctl00$hdFolderIDBookMarks: "",
      __EVENTARGUMENT: to || "",
      __EVENTTARGET: target ?? weirdData.__EVENTTARGET,
    };

    const { data: responseData, request } = await http.post(
      from,
      QueryEncode(requestData),
      {
        headers: {
          ...defaultHeader(cookies),
          Referer: from,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return this.create({
      html: responseData,
      weirdData: hiddenInputs(loadHtml(responseData)),
      redirected: request.res.responseUrl as string,
    });
  }
}
