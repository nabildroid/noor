import * as functions from "firebase-functions";
import * as fs from "fs";
import * as html_to_pdf from "html-pdf-node";


import { IncrementalData } from "../../../../types";
import Redirect from "../../../../core/redirect";
import { FormInput } from "../../../../core/form";
import { executeVariant } from "../../../../core/variatForm";
import { fetchOptions } from "../formOptions";
import { editSkillSubmit } from "../editSkill/submit";
import { skill } from "./utils";
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

function formInputValue(inputs: FormInput[], name: string) {
  return (
    inputs.find((i) => i.name == name)?.options.find((o) => o.selected)?.text ??
    ""
  );
}

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

  db.collection("reports").add({
    user: context.auth.uid,
    files: {
      csv: onlineCSV.name,
      pdf: onlinePDF.name,
    },
    params,
    isEmpty: data.isEmpty,
  });
});

function createParmsFromInputs(inputs: FormInput[]) {
  const result = {};

  inputs.forEach((i) => {
    result[i.name!] = i.options.find((e) => e.selected);
  });

  return result;
}

function createCSV(items: Item[], fileName: string) {
  let csv = "";
  const add = (x: string) => (csv = `${csv},${x.replace(/,/g, " ")}`);

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

async function createPDF(items: Item[], fileName: string, inputs: FormInput[]) {
  //  todo use the rating from front end

  const ratings = [
    ...items.reduce((acc, i) => {
      i.students.reduce((a, s) => {
        a.add(s.value);
        return a;
      }, acc);
      return acc;
    }, new Set<string>()),
  ];

  const students = {};

  items
    .map((e) => e.students)
    .flat()
    .forEach((item) => {
      if (students[item.title] == undefined) {
        students[item.title] = ratings.reduce((acc, v) => {
          acc[v] = 0;
          return acc;
        }, {});
      }
      students[item.title][item.value]++;
    });

  const texts = Object.entries(students).map(([k, v]) => [
    k,
    ...Object.values(v),
  ]);

  const template = createPDFTemplate({
    head: ["اسم الطالب", ...ratings],
    title: "كشف المهاراة",
    items: texts,
    details: {
      length: items.length,
      class: formInputValue(inputs, "ctl00$PlaceHolderMain$ddlClass"),
      semester: formInputValue(inputs, "ctl00$PlaceHolderMain$ddlSection"),
      type: formInputValue(inputs, "ctl00$PlaceHolderMain$ddlUnitTypesDDL"),
      unit: formInputValue(inputs, "ctl00$PlaceHolderMain$ddlUnit"),
    },
  });

  let options = {
    printBackground: true,
    format: "A3",
    margin: {
      top: "20px",
    },
  };

  let file = { content: template };

  const tempFilePath = path.join(os.tmpdir(), fileName + ".pdf");

  await new Promise<void>(res=>{
    html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      fs.writeFileSync(tempFilePath, pdfBuffer);
      res();
    });
  })
  

  return tempFilePath;
}

function createPDFTemplate(config: {
  title: string;
  head: string[];
  items: string[][];
  details: {
    class: string;
    semester: string;
    unit: string;
    type: string;
    length: number;
  };
}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${config.title}</title>
    </head>
    <body>
      <div style=" padding: 0 3em">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
         <div></div>
          <div>
            <div style="display: flex; flex-direction: column; align-items:
            center; justify-content: space-between;"">
            <div style="width: 100px; height: 75px; background-color: aqua"></div>
            <h3>${config.title}</h3>
          </div>
        </div>
        <div style="text-align: right">
        <div>
          <span>الصف</span>
          <span>${config.details.class}</span>
        </div>
        <div>
          <span>الفصل</span>
          <span>${config.details.semester}</span>
        </div>
        <div>
          <span>نوع الوحدة</span>
          <span>${config.details.type}</span>
        </div>
        <div>
          <span>الوحدة الدراسية</span>
          <span>${config.details.unit}</span>
        </div>
        <div>
          <span>عدد المهاراة</span>
          <span>${config.details.length}</span>
        </div>
      </div>
      </div>
  
      <table style="border: 1px solid black;padding: 0px;  width: 100%; direction: rtl; text-align: right;border-collapse: collapse;">
              
          <thead>
  
  
              <tr style=" text-align:center; background-color: rgb(199, 199, 199); margin: -2px;">
${config.head
  .map(
    (head, i) => `
<th style="padding: 6px 0;${i == 0 ? "text-align:center" : ""}">${head}</th>

`
  )
  .join("")}  

              </tr>
          </thead>
          <tbody>

          ${config.items
            .map(
              (item) => `
          <tr style="padding-right: 10px; text-align: center; ">

          ${item
            .map(
              (text, i) => `
          
          <td style="padding: 3px 0; ${
            i == 0 ? "padding-right: 3px; text-align: right;" : ""
          } border: 1px solid rgb(108, 108, 108);" >${text}</td>
          `
            )
            .join("")}
          </tr>
          `
            )
            .join("")}
  
              </tbody>
      </table>
      </div>  
  </body>
  </html>
  
  
  `;
}
