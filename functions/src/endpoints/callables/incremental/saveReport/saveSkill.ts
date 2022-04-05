import * as functions from "firebase-functions";

import { IncrementalData } from "../../../../types";
import Redirect from "../../../../core/redirect";
import Form, { FormInput } from "../../../../core/form";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  isEmpty: boolean;
}

export default functions.https.onCall(async (data: NavigationData) => {
  const homePage = await Redirect.load({
    cookies: data.cookies,
    weirdData: data.weirdData,
    from:
      data.from ??
      "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
  });
});
