import * as functions from "firebase-functions";
import { FormInput } from "../../../../core/form";
import Redirect from "../../../../core/redirect";
import { IncrementalData } from "../../../../types";
import { SkillsForm } from "./utils";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  skills: {
    id: number;
    value: number;
  }[];
}

export default functions
  .region("asia-south1")
  .https.onCall(async (data: NavigationData) => {
    const homePage = await Redirect.load(data);

    const form = await saveSkills(data, homePage);

    return homePage.sendForm(form);
  });

export async function saveSkills(data: NavigationData, homePage: Redirect) {
  const form = SkillsForm.fromJson({
    action: data.action,
    weirdData: data.weirdData,
    inputs: data.inputs,
    actionButtons: [],
    ...homePage.send({}),
  });

  const response = await form.save(data.skills, homePage);
  form.updateFromSubmission(response);
  return form;
}
