import * as functions from "firebase-functions";
import { FormInput } from "../../../../core/form";
import Redirect from "../../../../core/redirect";
import { IncrementalData } from "../../../../types";
import { SkillsForm } from "./utils";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  actionButton?: FormInput;
}

export default functions
  .region("asia-south1")
  .https.onCall(async (data: NavigationData) => {
    const homePage = await Redirect.load(data);

    const form = await fetchSkills(data, homePage);

    return homePage.sendForm(form);
  });

export async function fetchSkills(data: NavigationData, homePage: Redirect) {

  const form = SkillsForm.fromJson({
    action: data.action,
    weirdData: data.weirdData,
    inputs: data.inputs,
    actionButtons: [data.actionButton],
    ...homePage.send({})
  });

  const search = await form.submit(data.actionButton.name!, homePage);

  const weirdData = form.updateFromSubmission(search);
  homePage.setWeiredData(weirdData);
  return form;
}
