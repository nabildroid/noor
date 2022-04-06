import * as functions from "firebase-functions";

import { IncrementalData } from "../../../../types";
import Redirect from "../../../../core/redirect";
import Form, { FormInput } from "../../../../core/form";
import { executeVariant } from "../../../../core/variatForm";
import { EditSkillForm } from "../editSkill/utils";
import { editSkillSubmit } from "../editSkill/submit";
import { saveEditedSkills } from "../editSkill/save";
import { fetchOptions } from "../formOptions";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];

  rate: number;
}

export default functions.https.onCall(async (data: NavigationData) => {
  const homePage = await Redirect.load({
    cookies: data.cookies,
    weirdData: data.weirdData,
    from:
      data.from ??
      "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
  });

  let from: "execute" | "fetch" = "execute";

  let { action } = data;
  executeVariant(data.inputs, {
    execute: async (inputs) => {
      from = "execute";
      // go to the seach button
      action = await executeSkillEdits(
        {
          ...data,
          inputs,
          ...homePage.send({}),
          action,
        },
        homePage
      );
    },
    fetchOptions: async (inputs, name) => {
      from = "fetch";

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
    ],
  });
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

  action = savedResponse.toJson().action;
  return action;
}
