import { load } from "cheerio";

export default abstract class Table<T extends { [key: string]: any }> {
  private root: cheerio.Root;
  private table: cheerio.Cheerio;

  protected $(selector: string, context?: cheerio.Cheerio) {
    return this.root(selector, context || this.table);
  }

  constructor(html: string, id?: string) {
    this.root = load(html);
    if (id) {
      this.table = this.root(`div[id='${id}']`);
    } else {
      this.table = this.root("table");
    }
  }

  lines() {
    const lines: (T & { id: string })[] = [];

    this.$("tbody > tr").each((i, e) => {
      const elm = this.root(e);

      if (i == 0) return;
      if (!this.filter(elm)) return;

      const id = elm.attr("id");
      lines.push({
        id,
        ...this.processLine(elm),
      });
    });

    return lines;
  }

  protected abstract processLine(tr: cheerio.Cheerio): T;
  protected abstract filter(tr: cheerio.Cheerio): boolean;
}
