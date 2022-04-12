import * as functions from "firebase-functions";
import { FormInput } from "../../core/form";
import Redirect from "../../core/redirect";
import { executeVariant } from "../../core/variatForm";
import { IncrementalData } from "../../types";
import { saveSkills } from "../callables/incremental/editSkill/save";
import { fetchSkills } from "../callables/incremental/editSkill/submit";
import { fetchOptions } from "../callables/incremental/formOptions";
import { navigateToForm } from "../callables/incremental/navigation";

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
    snapshot.ref.update({ completed: true, payload: {} });

    const homePage = Redirect.load(data);

    // CHECK get the skillsIDS and the form variante, you don't have to fetch all skills everytime, but the skills my vary depending on the form paramters!

    let { action } = data;


    await executeVariant(data.inputs, homePage, {
      execute: async (inputs, redirect) => {
        const { cookies, redirected, weirdData } = redirect.send({});

        const config = {
          ...data,
          inputs,
          action,
          cookies,
          from: redirected,
          weirdData,
        };
        const response = await executeSkillEdits(config, redirect);

        action = response.action; // CHECK this is might be the cause of paralism not working
        redirect.setWeiredData(response.weirdData);
      },
      recreation: async (redirect) => {
        const params = await redirect.send({});
        const newR = await Redirect.start({
          cookies: params.cookies,
        });

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

      fetchOptions: async (inputs, name, redirect) => {
        const { cookies,from, redirected, weirdData } = redirect.send({});
        const response = await fetchOptions(
          {
            inputs,
            action,
            actionButtons: [],
            name,
            cookies,
            from: redirected,
            weirdData,
          },
          redirect
        );

        return response.toJson().inputs;
      },
      customSelect: [
        {
          name: "ctl00$PlaceHolderMain$ddlStudySystem",
          value: "منتظم",
        },
      ],
    });
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
