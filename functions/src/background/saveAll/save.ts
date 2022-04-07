import * as functions from "firebase-functions";

import { IncrementalData } from "../../types";
import Redirect from "../../core/redirect";
import { FormInput } from "../../core/form";
import { executeVariant } from "../../core/variatForm";
import { editSkillSubmit } from "../../endpoints/callables/incremental/editSkill/submit";
import { saveEditedSkills } from "../../endpoints/callables/incremental/editSkill/save";
import { fetchOptions } from "../../endpoints/callables/incremental/formOptions";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];

  rate: number;
}

export default functions.firestore
  .document("tasks/{taskId}")
  .onCreate(async (snapshot) => {
    const data = snapshot.data() as NavigationData;

    const homePage = Redirect.load({
      cookies: data.cookies,
      weirdData: data.weirdData,
      from:
        data.from ??
        "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
    });

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
  const response = await editSkillSubmit(
    {
      ...data,
      ...homePage.send({}),
    },
    homePage
  );
  // get all the skills with thier ids
  let { action, skills, inputs } = response.toJson();
  // submit
  let editSkills = skills.map((s) => ({
    id: s.skillId,
    value: data.rate,
  }));

  const savedResponse = await saveEditedSkills(
    {
      ...data,
      inputs,
      ...homePage.send({}),
      action,
      skills: editSkills,
    },
    homePage
  );

  return savedResponse.toJson();
}
