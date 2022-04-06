import * as functions from "firebase-functions";

import { IncrementalData } from "../../../../types";
import Redirect from "../../../../core/redirect";
import Form, { FormInput } from "../../../../core/form";
import { Degrees, SaveDegreeForm } from "./utils";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  degrees: Degrees[];
}

export default functions.https.onCall(async (data: NavigationData) => {
  const homePage = await Redirect.load({
    cookies: data.cookies,
    weirdData: data.weirdData,
    from:
      data.from ??
      "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
  });

  const form = new SaveDegreeForm(
    Form.fromJson({
      action: data.action,
      weird: data.weirdData,
      inputs: data.inputs,
      actionButtons: [],
    }).html
  );

  const search = await form.save(data.degrees, homePage);
  const response = SaveDegreeForm.updateFromSreachSubmission(search);

  return homePage.sendForm(form, {
    ...form.toJson(),
  });
});
