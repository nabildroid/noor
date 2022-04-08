import * as functions from "firebase-functions";
import * as fs from "fs";
import { IncrementalData } from "../../../../types";
import Redirect from "../../../../core/redirect";
import Form, { FormInput } from "../../../../core/form";
import { executeVariant } from "../../../../core/variatForm";
import { fetchOptions } from "../formOptions";
import { editSkillSubmit } from "../editSkill/submit";
import { skill } from "./utils";
import { fstat } from "fs";
import path = require("path");
import os = require("os");
import { randomString } from "../../../../utils";
import { db, storage } from "../../../../common";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  actionButton?: FormInput;
  isEmpty: boolean;
}

type Item = { title: string; students: skill[] };

export default functions.https.onCall(async (data: NavigationData, context) => {
  const homePage = await Redirect.load({
    cookies: data.cookies,
    weirdData: data.weirdData,
    from:
      data.from ??
      "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
  });

  let { action } = data;

  let items: Item[] = [];

  await executeVariant(data.inputs, {
    execute: async (inputs) => {
      const title = inputs[inputs.length - 1].options.find(
        (e) => e.selected
      )!.text;

      const response = await editSkillSubmit(
        {
          ...data,
          inputs,
          ...homePage.send({}),
          action,
        },
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
  const pdf = createPDF(items, fileName);

  const config = (filePath:string)=>({
    metadata: {
      metadata: {
        userId: context.auth.uid,
        from: "saveReport/newSkillReport",
      },
    },
    destination:`reports/${path.basename(filePath)}`
  })

  const [onlineCSV] = await storage.upload(csv, config(csv));
  // const [onlinePDF] = await storage.upload(`reports/${pdf}`, config);

  const params = createParmsFromInputs(data.inputs);

  db.collection("reports").add({
    user: context.auth.uid,
    files: {
      csv: onlineCSV.name,
    },
    params,
    isEmpty: data.isEmpty,
  });
});

function createParmsFromInputs(inputs: FormInput[]) {
  const result = {};

  inputs.forEach((i) => {
    result[i.name!] = i.options.find((e) => e.selected)
  });

  return result;
}

function createCSV(items: Item[], fileName: string) {
  let csv = "";
  const add = (x: string) => (csv = `${csv},${x}`);

  add("");
  items[0].students.forEach((s) => add(s.title));
  csv += "\n";

  items.forEach((item) => {
    add(item.title);
    item.students.forEach((s) => {
      add(s.value);
    });
    csv += "\n";
  });

  const tempFilePath = path.join(os.tmpdir(), fileName + ".csv");

  fs.writeFileSync(tempFilePath, csv);
  return tempFilePath;
}

function createPDF(items: Item[], fileName: string) {
  const tempFilePath = path.join(os.tmpdir(), fileName + ".pdf");

  return tempFilePath;
}
