import { load } from "cheerio";
import { FormInput } from "./form";

abstract class Table<T extends { [key: string]: any }> {
  private root: cheerio.Root;
  private table: cheerio.Cheerio;

  private $(selector: string, context?: cheerio.Cheerio) {
    return this.root(selector, context || this.table);
  }

  constructor(html: string, id: string) {
    this.root = load(html);
    this.table = this.root(`div[id='${id}']`);
  }

  lines() {
    const lines: (T & { id: string })[] = [];

    this.$("tr").map((i, e) => {
      if (!i) return;

      const elm = this.root(e);
      const id = elm.attr("id");
      lines.push({
        id,
        ...this.processLine(elm),
      });
    });

    return lines;
  }

  protected abstract processLine(th: cheerio.Cheerio): T;
}

type skill = {
  num: number;
  type: string;
  name: string;
  input: FormInput;
};

class SkillEditTable extends Table<skill> {
  protected processLine(th: cheerio.Cheerio): skill {
    
  }
}
