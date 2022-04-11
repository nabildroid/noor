import * as functions from "firebase-functions";
import { FormInput } from "../../../core/form";
import Redirect from "../../../core/redirect";
import { executeVariant } from "../../../core/variatForm";
import { IncrementalData } from "../../../types";
import { saveEditedSkills } from "../../callables/incremental/editSkill/save";
import { editSkillSubmit } from "../../callables/incremental/editSkill/submit";
import { fetchOptions } from "../../callables/incremental/formOptions";
import { navigateToForm } from "../../callables/incremental/navigation";

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

    // todo remove thisx
    snapshot.ref.update({ completed: true, payload: {} });

    const homePage = Redirect.load({
      cookies: data.cookies,
      weirdData: data.weirdData,
      from:
        data.from ??
        "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
    });

    // CHECK get the skillsIDS and the form variante, you don't have to fetch all skills everytime, but the skills my vary depending on the form paramters!

    let { action } = data;

    await executeVariant(data.inputs, homePage, {
      execute: async (inputs, redirect) => {
        // go to the seach button
        const response = await executeSkillEdits(
          {
            ...data,
            inputs,
            ...redirect.send({}),
            action,
          },
          redirect
        );

        action = response.action;
        redirect.setWeiredData(response.weirdData);
      },
      fetchOptions: async (inputs, name, redirect) => {
        const response = await fetchOptions(
          {
            ...data,
            inputs,
            ...redirect.send({}),
            action,
            actionButtons: [],
            name,
          },
          redirect
        );
        // submit the form
        return response.toJson().inputs;
      },
      recreation: async (redirect) => {
        const newR = await Redirect.start(redirect.send({}));

        // get page title
        const navs = ["المهارات", "إدخال نتائج المهارة على مستوى وحدة ومهارة"];
        const { secondNav, form } = await navigateToForm(newR, {
          nav1: navs[0],
          nav2: navs[1],
          account: "",
          ...newR.send({}),
        });

        secondNav.setWeiredData(form.getWeirdData());

        return secondNav;
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
