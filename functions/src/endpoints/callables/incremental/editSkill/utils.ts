import { load as loadHtml } from "cheerio";
import Form from "../../../../core/form";
import Table from "../../../../core/table";

export class EditSkillForm extends Form {
  constructor(html: string) {
    super(html);
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
          const table = new SkillEditTable(target);

          const skills = table.lines();
          this.appendSkills(name, skills);
        }
      },
    });
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

export class SkillEditTable extends Table<skill> {
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
