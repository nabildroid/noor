import http from "axios";
const cry = require("crypto-js");
import { stringify as QueryEncode } from "querystring";
import * as functions from "firebase-functions";

import { LOGIN_ENDPOINT } from "../..";

export default functions.https.onRequest(async (req, res) => {
  const iv = cry.enc.Utf8.parse("1052099214050902");
  const key = cry.enc.Utf8.parse("p10zpop213tpDW41");

  const encr = (x: any) =>
    cry.AES.encrypt(x, key, {
      iv,
      keySize: 16,
      mode: cry.mode.CBC,
      padding: cry.pad.Pkcs7,
    }).toString();

  if (req.method != "POST") {
    res.status(301).send("unauthorise");
  } else {
    const {
      __VIEWSTATEGENERATOR,
      __VIEWSTATEENCRYPTED,
      __EVENTVALIDATION,
      __VIEWSTATE,
      cookies,
    } = req.body;
    const { name, password, captcha } = req.body;
    console.log(req.body);

    if (false) {
      // TODO check Data
      res.status(301).send("error");
    } else {
      const postData = {
        __LASTFOCUS: "",
        __EVENTTARGET: "",
        __EVENTARGUMENT: "",
        __VIEWSTATE,
        __VIEWSTATEENCRYPTED,
        __EVENTVALIDATION,
        __VIEWSTATEGENERATOR,
        hdnLanguage: 1,
        bMtSMB1: "تسجيل الدخول",
        tMbPAN1: name,
        tMbPAR1: encr(password),
        tMbPAG1: captcha,
      };

      require("axios-debug-log")({
        request: function (debug: any, config: any) {
          console.log(config);
        },
      });

      try {
        await http.post(LOGIN_ENDPOINT, QueryEncode(postData), {
          headers: {
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "fr-DZ,fr;q=0.9,en-US;q=0.8,en;q=0.7,ar;q=0.6",
            "Cache-Control": "max-age=0",
            Connection: "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            Host: "noor.moe.gov.sa",
            Origin: "https://noor.moe.gov.sa",
            Referer: LOGIN_ENDPOINT,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "Linux",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
            Cookie: cookies.join("; "),
          },
          maxRedirects: 0,
        });
      } catch (e: any) {
        if (e.response && e.response.status == 302) {
          res.json({ login: "success" });
          return;
        }
      }
      res.json({ login: "failed" });
    }
  }
});
