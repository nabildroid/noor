import * as functions from "firebase-functions";
import { extractHomeData } from "../../../helpers";

export default functions.https.onCall(async (data, context) => {
  if (
    !context.auth ||
    !(data.cookies instanceof Array) ||
    !data.cookie.length
  ) {
    console.warn("unaccepted request from", context.auth);
    return {};
  }

  return await extractHomeData(data.cookies);
});
