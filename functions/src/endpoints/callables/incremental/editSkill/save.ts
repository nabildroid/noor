import * as functions from "firebase-functions";

import { IncrementalData } from "../../../../types";
import Redirect from "../../../../core/redirect";
import Form, { FormInput } from "../../../../core/form";
import { EditSkillForm } from "./utils";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  skills: {
    id: number;
    value: number;
  }[];
}

export default functions.https.onCall(async (data: NavigationData) => {
  const homePage = await Redirect.load({
    cookies: data.cookies,
    weirdData: data.weirdData,
    from:
      data.from ??
      "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
  });

  const form = await saveEditedSkills(data, homePage);

  return homePage.sendForm(form, {
    ...form.toJson(),
  });
});

export async function saveEditedSkills(data: NavigationData, homePage: Redirect) {
  const form = new EditSkillForm(
    Form.fromJson({
      action: data.action,
      weird: data.weirdData,
      inputs: data.inputs,
      actionButtons: [],
    }).html
  );

  const response = await form.save(data.skills, homePage);
  form.updateFromSreachSubmission(response);
  return form;
}
