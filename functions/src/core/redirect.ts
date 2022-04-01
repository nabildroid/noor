import http from "axios";
import { stringify as QueryEncode } from "querystring";
import { load as loadHtml } from "cheerio";
import { weird } from "../types";
import { replaceNullValues } from "../utils";

import {
  defaultHeader,
  hiddenInputs,
  mergeCookies,
  pageNameBase64,
} from "../utils";

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

interface RedirectionLoadParams {
  from: string;
  cookies: string[];
  weirdData: weird;
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
  prevCookies: string[];
}

export default class Redirect {
  private from: string;
  private to: string;
  private weirdData: weird;
  private cookies: string[];
  private prevCookies: string[];
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
    const { data, headers } = await http.get(config.from, {
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
      prevCookies: headers["set-cookie"],
    });
  }

  static load(config: RedirectionLoadParams) {
    return new Redirect({
      cookies: config.cookies,
      from: config.from,
      target: "",
      to: "",
      weirdData: config.weirdData,
      html: "",
      redirected: "",
      prevCookies: [],
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
    this.prevCookies = config.prevCookies;
  }

  async nextIf(
    condition: (config: RedirectionResponse) => Promise<boolean>,
    treat: (config: RedirectionResponse) => Promise<RedirectionNavigationParams>
  ) {
    const response = {
      html: this.html,
      redirected: this.redirected,
      weirdData: this.weirdData,
      prevCookies: this.prevCookies,
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
      prevCookies: this.prevCookies,
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
      prevCookies: this.prevCookies,
    };
  }

  async fork(to: string, payload: any) {
    const cookies = mergeCookies(this.prevCookies, this.cookies);

    payload = replaceNullValues(payload, "");

    const { data, headers } = await http.post(to, QueryEncode(payload), {
      headers: {
        ...defaultHeader(cookies),
        Referer: this.from,
        "Content-Type": "application/x-www-form-urlencoded",
        "X-MicrosoftAjax": "Delta=true",
        "X-Requested-With": "XMLHttpRequest",
        ADRUM: "isAjax:true",
      },
      proxy: {
        host: "127.0.0.1",
        port: 8082,
      },
    });

    this.prevCookies = mergeCookies(
      this.cookies,
      this.prevCookies,
      headers["set-cookie"]
    );

    return data;
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

    replaceNullValues(requestData, "");

    const {
      data: responseData,
      headers,
      request,
    } = await http.post(from, QueryEncode(requestData), {
      headers: {
        ...defaultHeader(cookies),
        Referer: from,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return this.create({
      html: responseData,
      weirdData: hiddenInputs(loadHtml(responseData)),
      redirected: request.res.responseUrl as string,
      prevCookies: headers["set-cookie"] ?? [],
    });
  }
}
