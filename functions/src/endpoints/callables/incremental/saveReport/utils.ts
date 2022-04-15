import path = require("path");
import os = require("os");
import * as fs from "fs";
import * as html_to_pdf from "html-pdf-node";
import { FormInput } from "../../../../core/form";
import Table from "../../../../core/table";

export type skill = {
  id: string;
  value: string;
  skillId: number;
  title: string;
};

export class SaveReportExamTable extends Table<skill, undefined> {
  protected filter(tr: cheerio.Cheerio): boolean {
    return this.$("img", tr).length != 0;
  }
  protected processLine(tr: cheerio.Cheerio): skill {
    const img = this.$("img", tr);
    const skillId = img.attr("skillid");
    const value = img.attr("title");

    const id = tr.attr("id").replace(/_/g, "$");
    const title = this.$("td", tr).first().text();

    return {
      id,
      value,
      title,
      skillId: parseInt(skillId),
    };
  }
}

export function createParmsFromInputs(inputs: FormInput[]) {
  const result = {};

  inputs.forEach((i) => {
    result[i.name!] = i.options.find((e) => e.selected);
  });

  return result;
}

export type Item = { title: string; students: skill[] };

export function createCSV(items: Item[], fileName: string) {
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

export async function createPDF(
  items: Item[],
  fileName: string,
  inputs: FormInput[]
) {
  //  todo use the rating from front end

  let ratings = [
    ...items.reduce((acc, i) => {
      i.students.reduce((a, s) => {
        a.add(s.value);
        return a;
      }, acc);
      return acc;
    }, new Set<string>(Ratins[0].map((e) => e.name))),
  ].filter(Boolean);

  console.log(ratings);

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

  await new Promise<void>((res) => {
    html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      fs.writeFileSync(tempFilePath, pdfBuffer);
      res();
    });
  });

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

function formInputValue(inputs: FormInput[], name: string) {
  return (
    inputs.find((i) => i.name == name)?.options.find((o) => o.selected)?.text ??
    ""
  );
}

export const Ratins = [
  [
    {
      name: "أتقن",
      description: "",
      id: "1",
    },
    {
      name: "لم يتقن",
      description: "",
      id: "2",
    },
    {
      name: "إلى حد ما",
      description: "",
      id: "3",
    },
    {
      name: "غير محدد",
      description: "",
      id: "",
    },
  ],
  [
    {
      name: "متقن للمعيار 100%",
      description: "",
      id: "1",
    },
    {
      name: "متقن للمعيار من 90% الى أقل من 100%",
      description: "",
      id: "3",
    },
    {
      name: "متقن للمعيار من 80% الى أقل من 90%",
      description: "",
      id: "4",
    },
    {
      name: "غير متقن للمعيار أقل من 80%",
      description: "",
      id: "0",
    },
    {
      name: "غائب",
      description: "",
      id: "2",
    },
    {
      name: "غير محدد",
      description: "",
      id: "",
    },
  ],
  [
    {
      name: "جيد",
      description: "",
      id: "good",
    },
    {
      name: "سيء",
      description: "",
      id: "bad",
    },
    {
      name: "غير محدد",
      description: "",
      id: "unknown",
    },
    {
      name: "غير محدد",
      description: "",
      id: "somewhat",
    },
  ],
];
