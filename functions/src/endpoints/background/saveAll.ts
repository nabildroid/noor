import * as functions from "firebase-functions";
import { FormInput } from "../../core/form";
import Redirect from "../../core/redirect";
import { executeVariant } from "../../core/variatForm";
import { IncrementalData } from "../../types";
import { saveSkills } from "../callables/incremental/editSkill/save";
import { fetchSkills } from "../callables/incremental/editSkill/submit";
import { fetchOptions } from "../callables/incremental/formOptions";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];

  rate: number;
}

export default functions
  .region("asia-south1")
  .runWith({
    timeoutSeconds: 60 * 9,
  })
  .firestore.document("tasks/{taskId}")
  .onCreate(async (snapshot) => {
    const data = snapshot.data().payload as NavigationData;

    const homePage = Redirect.load(data);

    // CHECK get the skillsIDS and the form variante, you don't have to fetch all skills everytime, but the skills my vary depending on the form paramters!

    let { action } = data;

    await executeVariant(data.inputs, {
      execute: async (inputs) => {
        // go to the seach button
        const response = await executeSkillEdits(
          {
            ...data,
            inputs,
            ...homePage.send({}),
            action,
          },
          homePage
        );

        action = response.action;
        homePage.setWeiredData(response.weirdData);
      },
      fetchOptions: async (inputs, name) => {
        const response = await fetchOptions(
          {
            ...data,
            inputs,
            ...homePage.send({}),
            action,
            actionButtons: [],
            name,
          },
          homePage
        );
        // submit the form
        return response.toJson().inputs;
      },
      customSelect: [
        {
          name: "ctl00$PlaceHolderMain$ddlUnitTypesDDL",
          value: "الكل",
        },
        {
          name: "ctl00$PlaceHolderMain$ddlStudySystem",
          value: "منتظم",
        },
      ],
    });

    snapshot.ref.update({ completed: true, payload: {} });
  });

async function executeSkillEdits(data: NavigationData, homePage: Redirect) {
  const response = await fetchSkills(data, homePage);
  // get all the skills with thier ids
  let { action, skills, inputs } = response.toJson();
  // submit
  let editedSkill = skills.map((s) => ({
    id: s.skillId,
    value: data.rate,
  }));

  const savedResponse = await saveSkills(
    {
      ...data,
      inputs,
      action,
      skills: editedSkill,
    },
    homePage
  );

  return savedResponse.toJson();
}
