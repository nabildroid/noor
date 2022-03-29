import * as functions from "firebase-functions";

import { IncrementalData, weird } from "../../types";
import { extractRoleIds } from "../../utils";
import { load } from "cheerio";
import { extractHomeData } from "../../helpers";
import Redirect from "../../redirect";
import Form from "../../form";

interface NavigationData extends IncrementalData {
  currentAccount: string;
  nav1: string;
  nav2: string;
}

export default functions.https.onRequest(async (req, res) => {
  // if (
  //   // !context.auth ||
  //   !(data.cookies instanceof Array) ||
  //   !data.cookies.length ||
  //   !data.nav1 ||
  //   !data.nav2
  // ) {
  //   console.warn("unaccepted request from", context.auth);
  //   return {};
  // }

  const data = {
    cookies: [
      "ASP.NET_SessionId=1iijxtyntwrd3icuivci0rnz; path=/; secure; HttpOnly; SameSite=Lax",
    ],
    nav1: "المهارات",
    nav2: "إدخال نتائج المهارة على مستوى طفل ووحدة",
    account:
      "معلم -الروضة الثانية عشرة بمكة المكرمة - الإدارة العامة للتعليم بمنطقة مكة المكرمة  - (بنات)",
  };

  const homePage = await Redirect.start({
    from: "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
    cookies: data.cookies,
  });

  const checkAccount = await homePage.nextIf(
    async (config) => {
      const home = await extractHomeData(config.html);
      console.log(home.currentAccount);
      console.log(home.allAccounts);
      console.log(home.currentAccount == data.account);
      return home.currentAccount.trim() != data.account.trim();
    },
    async (config) => {
      const home = await extractHomeData(config.html);
      const accountId = home.allAccounts.find(
        (e) => e.text == data.account
      )!.id;

      return {
        target: "SwitchUserTypeMenu",
        to: accountId,
        weirdData: home.weirdData,
      };
    }
  );

  const firstNav = await checkAccount.next(async (config) => {
    const home = await extractHomeData(config.html);
    const nav1Id = home.navigation.find((e) => e.text == data.nav1)!.id;

    console.log("##### YAYYYY first step!");
    return {
      target: "MenuItemRedirect",
      to: nav1Id,
      weirdData: home.weirdData,
    };
  });

  const secondNav = await firstNav.next(async (config) => {
    const nav2Ids = await innerNavigation(config.html);
    const nav2Id = nav2Ids[0].id;

    console.log("##### YAYYYY second step!");

    return {
      to: nav2Id.join(","),
      target: "OperationOnMenu",
    };
  });

  res.setHeader("redirectedUrl", secondNav.stop().redirected);

  const form = new Form(secondNav.stop().html);

  await form.fetchFromOption(
    {
      id: "ctl00$PlaceHolderMain$UpdatePanel1",
      name: "ctl00$PlaceHolderMain$ddlClass",
      value: "23",
    },
    [],
    secondNav
  );

  res.json(form.toJson());
});

async function innerNavigation(data: string) {
  const $ = load(data);

  return $("div.main_ul_links a")
    .map((_, e) => ({
      text: $(e).text(),
      id: extractRoleIds($(e).attr("onclick")!),
    }))
    .toArray() as any as { text: string; id: string[] }[];
}
