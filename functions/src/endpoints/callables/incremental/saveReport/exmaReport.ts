import * as functions from "firebase-functions";
import { db, storage } from "../../../../common";
import { FormInput } from "../../../../core/form";
import Redirect from "../../../../core/redirect";
import { executeVariant } from "../../../../core/variatForm";
import { IncrementalData } from "../../../../types";
import { randomString } from "../../../../utils";
import { fetchSkills } from "../editSkill/submit";
import { fetchOptions } from "../formOptions";
import { createCSV, createParmsFromInputs, createPDF, Item } from "./utils";


import path = require("path");

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  actionButton?: FormInput;
  isEmpty: boolean;
}




export default functions
  .region("asia-south1")
  .runWith({
    memory: "512MB",
  })
  .https.onCall(async (data: NavigationData, context) => {
    const homePage = await Redirect.load(data);

    let { action } = data;

    let items: Item[] = [];

    await executeVariant(data.inputs,homePage, {
      execute: async (inputs) => {
        const title = inputs[inputs.length - 1].options.find(
          (e) => e.selected
        )!.text;

        const response = await fetchSkills(
          {
            ...data,
            inputs,
            action,
          },
          false,
          homePage
        );
        // get all the skills with thier ids
        let { action: newAction, skills, weirdData } = response.toJson();

        items.push({
          title,
          students: skills,
        });

        action = newAction;

        homePage.setWeiredData(weirdData);
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

    items = items.map((e) => ({
      ...e,
      students: e.students.map((s) => ({
        ...s,
        value: data.isEmpty ? "" : s.value,
      })),
    }));

    const fileName = randomString();

    const csv = createCSV(items, fileName);
    const pdf = await createPDF(items, fileName, data.inputs);

    const config = (filePath: string) => ({
      metadata: {
        metadata: {
          userId: context.auth.uid,
          from: "saveReport/newSkillReport",
        },
      },
      destination: `reports/${path.basename(filePath)}`,
    });

    const [onlineCSV] = await storage.upload(csv, config(csv));
    const [onlinePDF] = await storage.upload(pdf, config(pdf));

    const params = createParmsFromInputs(data.inputs);

    await db.collection("reports").add({
      user: context.auth.uid,
      files: {
        csv: onlineCSV.name,
        pdf: onlinePDF.name,
      },
      params,
      isEmpty: data.isEmpty,
    });

    return homePage.send({});
  });

