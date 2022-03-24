import * as functions from "firebase-functions";
import { db } from "..";

export default functions.auth.user().onCreate(async (user) => {
  if (!user.email) {
    functions.logger.error("new user without email", user);
    return;
  }

  const name = user.email.split("@")[0];

  try {
    const cookieDoc = await db.collection("cookies").doc(name).get();
    const cookies = (cookieDoc.data() as any).cookies as string[];

    
  } catch (e) {
    functions.logger.error("user created without a cookie collection", user);
  }
});
