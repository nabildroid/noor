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
  data.actionButton = {
    name: "ctl00$PlaceHolderMain$ibtnSearch",
    value: "ابحث",
    id: "",
    options: [],
    title: "ssx",
  };

  const form = SkillsForm.fromJson({
    action: data.action,
    weird: data.weirdData,
    inputs: data.inputs,
    actionButtons: [data.actionButton],
  });

  const search = await form.submit(data.actionButton.name!, homePage);

  const weirdData = form.updateFromSubmission(search);
  homePage.setWeiredData(weirdData);
  return form;
}
