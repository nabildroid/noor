import * as functions from "firebase-functions";

import http from "axios";
import { load as loadHtml } from "cheerio";

import { auth, db } from "../common";

export default functions.auth.user().onCreate(async (user) => {
  if (!user.email) {
    console.error("new user without email", user);
    return;
  }

  const name = user.email.split("@")[0];

  try {
    const cookieDoc = await db.collection("cookies").doc(name).get();
    const cookies = (cookieDoc.data() as any).cookies as string[];

    const { userName } = (await extractInformation(cookies))!;

    await auth.updateUser(user.uid, {
      displayName: userName,
    });

    await auth.setCustomUserClaims(user.uid, {
      try: Date.now() + 5 * 24 * 3600 * 1000,
    });

    await db.collection("users").doc(user.uid).set({
      name: userName,
    });
  } catch (e) {
    console.error("user created without a cookie collection", user);
  }
});

async function extractInformation(cookies: string[]) {
  const ENDPOINT =
    "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx";

  try {
    const { data } = await http.get(ENDPOINT, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
        Cookie: cookies.join("; "),
      },
    });

    const $ = loadHtml(data);

    const userName = $(".username").text();

    return { userName };
  } catch (e) {
    throw Error("unable to extract the user imformation " + ENDPOINT);
  }
}
