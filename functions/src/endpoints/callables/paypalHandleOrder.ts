import * as functions from "firebase-functions";

import * as Paypal from "@paypal/checkout-server-sdk";
import { db, isBlocked } from "../../common";

const clientId =
  "AV4gQ-jSryV-9cAV5Sgkl1HP0xcuybQ4Zds1L9Whez5jZsRFrpswaWVyOGa5xtlDpyVywgHoiS9LtaSM";
const secretKey =
  "EAjBYmutOwSoI97fN2hVU6v5ZIEMIqK4KZAC-7d6HeK4of4vYoJh6QeVW1Wa_8oYuC4RFaeEkTYhtU7b";
const env = new Paypal.core.SandboxEnvironment(clientId, secretKey);
const client = new Paypal.core.PayPalHttpClient(env);

export default functions
  .region("asia-south1")
  .https.onCall(async (data, context) => {
    if (isBlocked(context, true)) return;

    const orderId = data.orderId;
    let request = new Paypal.orders.OrdersCaptureRequest(orderId);


    const pro = (await db.doc("config/default").get()).data()?.pro ?? 90;
    const fromNow = Date.now() + 1000 * 3600 * 24 * pro;
    await db.doc(`users/${context.auth.uid}`).update({
      try: fromNow,
    });

    // todo move this line up!
    const response = await client.execute(request);

    

    return response.result;
  });
