import { load as loadHtml } from "cheerio";
import { checkValidity } from "./helpers";
import Redirect from "./redirect";
import { mergeNodeTexts } from "./utils";

export type FormInput = {
  title: string;
  value?: string;
  id: string;
  options: {
    selected: boolean;
    text: string;
    value: string;
  }[];
  name?: string;
};

export default class Form {
  private root: cheerio.Root;
  private form: cheerio.Cheerio;

  private $(selector: string, context?: cheerio.Cheerio) {
    return this.root(selector, context || this.form);
  }

  constructor(html: string) {
    if (!checkValidity(html)) {
      throw Error("you don't have the previlege to access this");
    }

    this.root = loadHtml(html);
    this.form = this.root("body > form").first();
  }

  private getInputs() {
    const inputs: FormInput[] = [];

    const titleFields = this.$("div.feild_title");

    titleFields.each((_, elm) => {
      const titleElm = this.root(elm);
      const title = mergeNodeTexts(this.$("span", titleElm), this.root);

      const parent = this.root(elm).parent();

      const select = this.$("select", parent);

      const id = select.parent().attr("id").replace(/_/g, "$");

      const options: {
        selected: boolean;
        text: string;
        value: string;
      }[] = [];

      let value = "";
      if (!select.length) {
        const next = titleElm.next();
        value = mergeNodeTexts(this.$("span", next), this.root);
      } else {
        this.$("option", select).each((_, e) => {
          const selected = !!this.root(e).attr("selected");
          const text = this.root(e).text();
          const value = this.root(e).attr("value");

          options.push({ selected, text, value });
        });
      }

      inputs.push({
        title,
        value,
        id,
        options,
        name: select.attr("name"),
      });
    });

    return inputs;
  }

  private getFormAction() {
    let action = this.form.attr("action");
    action = action.replace("https://noor.moe.gov.sa/Noor/EduWaveSMS/", "");

    return `https://noor.moe.gov.sa/Noor/EduWaveSMS/${action}`.replace(
      "./",
      ""
    );
  }

  private getWeirdData() {
    const hiddens = this.$("input[type='hidden']");
    const hiddensSpecial = this.$("div[type='special']");

    let params = {} as any;
    hiddens.map((_, e) => {
      const elm = this.root(e);
      params[elm.attr("name")] = elm.attr("value");
    });

    hiddensSpecial.map((_, e) => {
      const elm = this.root(e);
      params[elm.attr("name")] = elm.text();
    });

    return params as { [key: string]: any };
  }

  private fetchOptionRequestPayload(
    config: { id: string; name: string; value: string },
    settings: { name: string; value: string }[]
  ) {
    const params = this.getInputs();
    let payload = params.reduce(
      (acc, v) => ({
        ...acc,
        [v.name]: v.options.find((e) => e.selected)?.value ?? "",
      }),
      {}
    );

    payload = {
      ...payload,
      [config.name]: config.value,

      ctl00oScriptManager: `${config.id}|${config.name}`,
    };

    const weirdData = this.getWeirdData();

    payload = {
      ...payload,
      ...weirdData,
      __EVENTTARGET: config.name,
      __ASYNCPOST: true,
      ctl00$tbNameBookMarks: "",
    };

    settings.forEach((s) => (payload[s.name] = s.value));

    return payload;
  }

  async fetchFromOption(
    config: { id: string; name: string; value: string },
    settings: { name: string; value: string }[],
    redirect: Redirect
  ) {
    const payload = this.fetchOptionRequestPayload(config, settings);
    const action = this.getFormAction();
    const data = await redirect.fork(action, payload);

    this.updateForm(data);
  }

  private updateForm(data: string) {
    const params = parseNewOptionsResponse(data);
    params.forEach((param) => {
      if (param[1] == "updatePanel") {
        const id = param[2].replace(/_/g, "$"); //CHECK if the first time this is the case!
        const value = param[3];
        console.log("-----------");
        console.log(id);
        console.log(value);
        this.$(`*[id='${id}'] > select`).first().replaceWith(value);
      } else if (param[1] == "hiddenField") {
        const name = param[2];
        const value = param[3];
        this.$(`input[name='${name}']`).attr("value", value);
        this.$(`div[name='${name}']`).html(value);
      } else if (param[1] == "formAction") {
        const action = param[3];
        this.form.attr("action", action);
      }
    });
  }

  static fromJson(config: {
    action: string;
    weird: { [key: string]: string };
    inputs: FormInput[];
  }) {
    const { action, weird, inputs } = config;
    const root = loadHtml("<body></body>");

    root("body").append(`<form action="${action}"></div>`);
    const form = root("form");

    Object.entries(weird)
      .map(([k, v]) => `<div type='special' name='${k}'>${v}</div>`)
      .forEach((e) => form.append(e));

    inputs.forEach((inp) => form.append(this.createField(inp)));
    return new Form(root.html());
  }

  toJson() {
    const action = this.getFormAction();
    const weirdData = this.getWeirdData();
    const inputs = this.getInputs();

    return {
      action,
      weirdData,
      inputs,
    };
  }

  static createField(input: FormInput) {
    const options = input.options
      .map(
        (o) => `
    <option ${o.selected ? "selected" : ""} value="${o.value}">${
          o.text
        }</option>
        >
    `
      )
      .join("");

    return `
    <div>
  <div class="feild_title">
    <span>${input.title}</span>
  </div>
  <div class="feild_data">
    <div id="${input.id}">
    <span>${input.value}</span>
      <select
        name="${input.name}"
      >
      ${options}
        
      </select>
    </div>
  </div>
</div>
`;
  }
}

function parseNewOptionsResponse(data: string) {
  return data.split("|").reduce(
    (acc, v) => {
      const last = acc[acc.length - 1];
      if (last.length > 3) {
        acc.push([v]);
      } else {
        last.push(v);
      }
      return acc;
    },
    [[]]
  ) as string[][];
}
