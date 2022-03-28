import { load as loadHtml } from "cheerio";
import { checkValidity } from "./helpers";

export default class Form {
  private _parent: cheerio.Root;
  private _context: cheerio.Cheerio;
  $(selector: string, context?: cheerio.Cheerio) {
    return this._parent(selector, context || this._context);
  }
  constructor(html: string) {
    if (!checkValidity(html)) {
      throw Error("you don't have the previlege to access this");
    }

    this._parent = loadHtml(html);
    this._context = this._parent("body > form").first();
  }

   getForm(index) {
    this.$(".form-controls")[index];
  }

  private getInputs(form: cheerio.Cheerio) {
    return this.$("div.feild_title", form)
      .map((_, elm) => {
        const titleElm = this._parent(elm);

        const title = this.$("span", titleElm)
          .map((_, s) => this._parent(s).text())
          .toArray()
          .reduce((acc, e) => `${acc} ${e}`, "") as string;

        const parent = this._parent(elm).parent();

        const select = this.$("select", parent);
        const options: {
          selected: boolean;
          text: string;
          value: string;
        }[] = [];

        let value = "";
        if (!select.length) {
          const next = titleElm.next();
          value = this.$("span", next)
            .map((_, s) => this._parent(s).text())
            .toArray()
            .reduce((acc, e) => `${acc} ${e}`, "");
        } else {
          this.$("option", select).map((i, e) => {
            const selected = !!this._parent(e).attr("selected");
            const text = this._parent(e).text();
            const value = this._parent(e).attr("value");

            options.push({ selected, text, value });
          });
        }

        return {
          title,
          value,
          options,
          name: select.attr("name"),
        };
      })
      .toArray() as any as {
      title: string;
      value?: string;
      options: {
        selected: boolean;
        text: string;
        value: string;
      }[];
      name?: string;
    }[];
  }

  private getWeirdData(form: cheerio.Cheerio) {
    // todo use utils/hiddenInputs
    const hiddens = this.$("input[type='hidden']", form);
    let params = {} as any;
    hiddens.map((_, e) => {
      const elm = e as any;
      params[elm.attribs.name] = elm.attribs.value;
    });

    return params as { [key: string]: any };
  }

  fetchOption(form: cheerio.Cheerio, name: string,previosValues:{
    name:string,
    value:string
  }[]) {
    const weirdData = this.getWeirdData(form);
    const inputs = this.getInputs(form);



    const updatedWeirdData = {
      ...weirdData,
      __EVENTTARGET: name,
    };


  }

  toJson() {}
  static fromJson() {}
}


const a = new Form("dsd");


