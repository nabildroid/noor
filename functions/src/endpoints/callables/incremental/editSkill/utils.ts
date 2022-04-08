import { load as loadHtml } from "cheerio";
import Form from "../../../../core/form";
import Redirect from "../../../../core/redirect";
import Table from "../../../../core/table";

export class EditSkillForm extends Form {
  constructor(html: string) {
    super(html);
  }

  async save(
    skills: {
      id: number;
      value: number;
    }[],
    redirect: Redirect
  ) {
    const skillValues =
      skills
        .reduce(
          (acc, v, i) => [
            ...acc,
            `${i == 0 ? "" : i - 1 + "#"}${v.value},${v.id}`,
          ],
          []
        )
        .join(",") + `,${skills.length-1}#`;

    const payload = this.fetchOptionRequestPayload(
      {
        name: "ctl00$PlaceHolderMain$hdnSkillResultIDs",
        value: skillValues,
      },
      []
    );

    skills.forEach((_,i)=>{
      payload[`ctl00$PlaceHolderMain$gvInsertSkillByUnitAndSkill$ctl${i+2}$tbTeacherNotes`]=""
    })

    const action = this.getFormAction();

    const data = await redirect.fork(action, {
      ...payload,
      __EVENTTARGET: "",
      ctl00$ibtnYes: "نعم",
      ctl00$hdnData_Data: "",
      ctl00$hdnData_Operation: "Save",
    });

    return data;
  }

  updateFromSreachSubmission(data: string) {
    this.updateForm(data);

    Form.parseResponse(data, {
      updatePanel: (id, value) => {
        const panel = loadHtml(value);
        // CHECK hardcoded
        if (id == "ctl00$PlaceHolderMain$UpdatePanel7") {
          const name = panel("table[id]").attr("id").replace(/_/g, "$");

          const target = panel(".GridClass").parent().html();
          if (target) {
            const table = new SkillEditTable(target);

            const skills = table.lines();
            this.appendSkills(name, skills);
          } else {
            this.appendSkills(name, []);
            console.warn("no skills to be appended");
          }
        }
      },
    });
    return this.getWeirdData();
  }

  toJson() {
    const data = super.toJson();

    return {
      ...data,
      ...this.getSkills(),
    };
  }

  private getSkills() {
    const table = this.$(".skillTable");
    const skillsId = table.attr("id");

    const skills: skill[] = [];

    this.$(">div", table).each((_, e) => {
      const elm = this.root(e);

      skills.push({
        id: elm.attr("id"),
        skillId: parseInt(this.$("span", elm).text()),
        value: this.$("p", elm).text(),
        title: this.$("h1", elm).text(),
      });
    });
    return {
      skillsId,
      skills,
    };
  }

  private appendSkills(id: string, skills: skill[]) {
    let elm = this.$(`*[id='${id}']`);
    if (!elm.length) {
      this.form.append(`<table id="${id}" class="skillTable"></table>`);
      elm = this.$(`*[id='${id}']`);
    }

    skills.forEach((skill) => {
      elm.append(`<div id="${skill.id}">
          <h1>${skill.title}</h1>
          <span>${skill.skillId}</span>
          <p>${skill.value}</p>
        </div>`);
    });
  }
}

export type skill = {
  id: string;
  value: string;
  skillId: number;
  title: string;
};

export class SkillEditTable extends Table<skill, undefined> {
  protected filter(tr: cheerio.Cheerio): boolean {
    return this.$("img", tr).length != 0;
  }
  protected processLine(tr: cheerio.Cheerio): skill {
    const img = this.$("img", tr);
    const skillId = img.attr("skillid") || img.attr("studentprofileid");
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
