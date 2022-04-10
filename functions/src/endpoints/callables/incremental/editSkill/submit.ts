import * as functions from "firebase-functions";

import { IncrementalData } from "../../../../types";
import Redirect from "../../../../core/redirect";
import Form, { FormInput } from "../../../../core/form";
import { EditSkillForm } from "./utils";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  actionButton?: FormInput;
}

export default functions
  .region("asia-south1")
  .https.onCall(async (data: NavigationData) => {
    const homePage = await Redirect.load({
      cookies: data.cookies,
      weirdData: data.weirdData,
      from:
        data.from ??
        "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
    });

    const form = await editSkillSubmit(data, homePage);

    // todo include the cookies and redirected;
    return homePage.sendForm(form, {
      ...form.toJson(),
    });
  });

export async function editSkillSubmit(
  data: NavigationData,
  homePage: Redirect
) {
  data.actionButton = {
    name: "ctl00$PlaceHolderMain$ibtnSearch",
    value: "ابحث",
    id: "",
    options: [],
    title: "ssx",
  };

  const form = new EditSkillForm(
    Form.fromJson({
      action: data.action,
      weird: data.weirdData,
      inputs: data.inputs,
      actionButtons: [data.actionButton],
    }).html
  );

  const search = await form.submit(data.actionButton.name!, homePage);

  const weirdData = form.updateFromSreachSubmission(search);
  homePage.setWeiredData(weirdData);
  return form;
}
