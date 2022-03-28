import http from "axios";


import { stringify as QueryEncode } from "querystring";

import { load as loadHtml } from "cheerio";
import { weird } from "./types";

import {
  defaultHeader,
  extractRoleId,
  hiddenInputs,
  pageNameBase64,
} from "./utils";

export async function extractHomeData(data:string) {
  
  try {
  
    const $ = loadHtml(data);

    const userName = $(".username").text();

    const currentAccount = $("div.userinfo div.hidden_user_info span").text();

    const allAccounts = $("div.userinfo ul.menu.TopUsers a")
      .map((_, e) => ({
        text: $(e).text(),
        id: extractRoleId($(e).attr("onclick")!),
      }))
      .toArray() as any as { text: string; id: string }[];

    const weirdData = hiddenInputs($);

    const navigation = await mainNavigation(data);

    return {
      userName,
      allAccounts,
      currentAccount,
      weirdData,
      navigation,
    };
  } catch (e) {
    console.error(e);
    throw Error("unable to extract the user imformation ");
  }
}

async function mainNavigation(data: string) {
  const $ = loadHtml(data);

  const menu = $(".tab-content ul.menu")
    .filter((e) => !$(e).hasClass("TopUsers"))
    .last();

  return $("a", menu)
    .map((_, e) => ({
      text: $(e).text(),
      id: extractRoleId($(e).attr("onclick")!),
    }))
    .toArray() as any as { text: string; id: string }[];
}

export async function redirect(config: {
  from: string;
  to: string;
  cookies: string[];
  weirdData: weird;
  target?: string;
}) {
  const { cookies, from, to, weirdData, target } = config;
  const requestData = {
    ...weirdData,
    ctl00$hdnData_Data: "",
    ctl00$hdnData_Operation: "",
    ctl00$hdnPageName: pageNameBase64(from), // HomePage
    ctl00$hdnStopInterval: "True",
    ctl00$hdPageIDBookMarks: "",
    ctl00$hdPageControlsBookMarks: "",
    ctl00$hdFolderIDBookMarks: "",
    __EVENTARGUMENT: to,
    __EVENTTARGET: target ?? weirdData.__EVENTTARGET,
  };

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

  

  return {
    responseData,
    weirdData: hiddenInputs(loadHtml(responseData)),
    cookies: headers["set-cookie"],
    redirected: request.res.responseUrl as string,
  };
}
