import * as functions from "firebase-functions";
import { db, isBlocked } from "../../common";

export default functions
  .region("asia-south1")
  .https.onCall(async (_, context) => {
    if (isBlocked(context, true)) return;

    const config = (await db.doc("/config/default").get()).data();

    return config?.price ?? 10;
  });
