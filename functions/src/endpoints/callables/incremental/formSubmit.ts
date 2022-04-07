import * as functions from "firebase-functions";

import { IncrementalData } from "../../../types";
import Redirect from "../../../core/redirect";
import Form, { FormInput } from "../../../core/form";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  actionButton: FormInput;
  id: string;
}

export default functions.https.onCall(async (data: NavigationData, context) => {
  console.log(data);
  const homePage = await Redirect.load({
    cookies: data.cookies,
    weirdData: data.weirdData,
    from:
      data.from ??
      "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
  });

  const form = Form.fromJson({
    action: data.action,
    weird: data.weirdData,
    inputs: data.inputs,
    actionButtons: [data.actionButton],
  });

  // const search = await form.submit(data.actionButton.name!, homePage);

  return homePage.sendForm(form);
});
