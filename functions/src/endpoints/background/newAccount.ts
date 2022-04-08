import * as functions from "firebase-functions";
import * as fs from "fs"


const path = require("path");
const os = require("os");
import { auth, db, storage } from "../../common";
import { extractHomeData } from "../../helpers";
import Redirect from "../../core/redirect";

export default functions.auth.user().onCreate(async (user) => {
  if (!user.email) {
    console.error("new user without email", user);
    return;
  }

  const name = user.email.split("@")[0];

  try {
    const cookieDoc = await db.collection("cookies").doc(name).get();
    const cookies = (cookieDoc.data() as any).cookies as string[];
    const homePage = await Redirect.start({
      from: "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
      cookies,
    });

    const homedata = (await extractHomeData(homePage.stop().html))!;


    

    const tempFilePath = path.join(os.tmpdir(), user.uid + ".html");

    fs.writeFileSync(tempFilePath,homePage.stop().html)
    await storage.upload(tempFilePath);

    const { userName, allAccounts, currentAccount } = homedata;
    const { weirdData } = homedata;

    if (!userName) {
      console.error("unable to extract userName for ", user);
      await auth.deleteUser(user.uid);
      return;
    }

    await auth.updateUser(user.uid, {
      displayName: userName,
    });

    await auth.setCustomUserClaims(user.uid, {
      try: Date.now() + 30 * 24 * 3600 * 1000,
    });

    await db
      .collection("users")
      .doc(user.uid)
      .set({
        name: userName,
        username: name,
        try: Date.now() + 30 * 24 * 3600 * 1000,
        role: [...allAccounts.map((e) => e.text), currentAccount],
        currentRole: currentAccount,
        weirdData,
      });
  } catch (e) {
    console.error("user created without a cookie collection", user, e);
  }
});
