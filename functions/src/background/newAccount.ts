import * as functions from "firebase-functions";

import { auth, db } from "../common";
import { extractHomeData } from "../helpers";

export default functions.auth.user().onCreate(async (user) => {
  if (!user.email) {
    console.error("new user without email", user);
    return;
  }


  const name = user.email.split("@")[0];

  try {
    const cookieDoc = await db.collection("cookies").doc(name).get();
    const cookies = (cookieDoc.data() as any).cookies as string[];

    const homedata = (await extractHomeData(cookies))!;
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
      try: Date.now() + 5 * 24 * 3600 * 1000,
    });

    await db
      .collection("users")
      .doc(user.uid)
      .set({
        name: userName,
        username: name,
        try: Date.now() + 5 * 24 * 3600 * 1000,
        role: [...allAccounts.map((e) => e.text), currentAccount],
        currentRole: currentAccount,
        weirdData,
      });
  } catch (e) {
    auth.deleteUser(user.uid);
    console.error("user created without a cookie collection", user, e);
  }
});
