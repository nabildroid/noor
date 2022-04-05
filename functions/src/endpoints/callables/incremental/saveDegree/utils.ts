import { load as loadHtml } from "cheerio";
import Form, { FormInput } from "../../../../core/form";
import Redirect from "../../../../core/redirect";
import Table from "../../../../core/table";

export class SaveDegreeForm extends Form {
  constructor(html: string) {
    super(html);
  }

  async save() {}

  updateFromSreachSubmission(data: string) {
    this.updateForm(data);

    Form.parseResponse(data, {
      updatePanel: (id, value) => {
        const panel = loadHtml(value);
        // CHECK hardcoded
        if (id == "ctl00$PlaceHolderMain$UpdatePanel7") {
          const name = panel("table[id]").attr("id").replace(/_/g, "$");

          const target = panel(".GridClass").parent().html();
          const table = new SaveDegreeTable(target);

          const skills = table.lines();

          //   this.appendSkills(name, skills);
        }
      },
    });
  }

  toJson() {
    const data = super.toJson();

    return {
      ...data,
    };
  }
}

export type Module = {
  presence: FormInput;
  title: string;
  input: {
    max: number;
    value: number;
    name: string;
    id: string;
  };
};

export type Degrees = {
  studentID: number;
  // todo add userProfileID
  studentName: string;
  semester: number;
  modules: Module[];
};

export class SaveDegreeTable extends Table<Degrees, Module[]> {
  protected filter(tr: cheerio.Cheerio): boolean {
    return true;
  }

  protected processLine(tr: cheerio.Cheerio, first: Module[]): Degrees {
    const modules = Array.from(first);

    const degree: Degrees = {
      modules: [],
    } as any;

    const items = this.$("td", tr);

    items.each((i, e) => {
      const elm = this.root(e);
      if (i == 0) {
        degree.studentID = parseInt(elm.text());
      } else if (i == 1) {
        degree.studentName = elm.text();
      } else if (i == 2) {
        degree.semester = parseInt(elm.text());
      } else {
        const select = this.$("select", elm);
        const input = this.$("input", elm);
        const currentModule = modules[degree.modules.length];
        if (select.length) {
          const options: {
            selected: boolean;
            text: string;
            value: string;
          }[] = [];

          this.$("option", select).each((_, e) => {
            const selected = !!this.root(e).attr("selected");
            const text = this.root(e).text();
            const value = this.root(e).attr("value");

            options.push({ selected, text, value });
          });
          const id = select.attr("id");
          const name = select.attr("name");

          degree.modules.push({
            ...currentModule,
            presence: {
              id,
              name,
              options,
              title: "",
            },
          });

        } else if (input.length) {
          const id = input.attr("id");
          const name = input.attr("name");
          const max = input.attr("maxnumber");
          const value = input.attr("value");
          currentModule.input = {
            ...currentModule.input,
            id,
            max: parseInt(max) || 0,
            value: parseFloat(value) || 0,
            name,
          };
        }
      }
    });

    return degree;
  }

  protected processFirstLine(tr: cheerio.Cheerio) {
    const modules: Module[] = [];

    const items = this.$("th", tr);
    items.each((i, e) => {
      if (i < 3 || i + 1 == items.length) return;
      if (i % 2 == 0) return;

      const elm = this.root(e);
      const text = elm.text();
      const [title, max] = text.split("/");

      modules.push({
        input: {
          max: parseInt(max),
          id: "",
          value: 0,
          name: "",
        },
        presence: {
          title: "",
          name: "",
          value: "",
          id: "",
          options: [],
        },
        title,
      });
    });

    return modules;
  }
}
