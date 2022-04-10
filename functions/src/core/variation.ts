import { clone } from "../utils";
import { FormInput } from "./form";
import Redirect from "./redirect";

export abstract class AbstractVariation {
  protected inputs: FormInput[];
  protected customOptions: { name: string; value: string }[];
  protected redirect: Redirect;

  private history: { inputs: FormInput[]; index: number }[];
  protected walked: Set<string>;
  protected index: number;

  protected get current() {
    return this.inputs[this.index];
  }

  protected get options() {
    return removeEmpty(this.current.options);
  }

  protected get nextInputOption() {
    return removeEmpty(this.inputs[this.index + 1]?.options ?? []);
  }

  // todo causes problem with the creation!
  protected get isDone() {
    return this.walked.has(createdPath(this.inputs));
  }

  protected next() {
    this.index++;
    return this;
  }
  protected prev() {
    this.index--;
    return this;
  }

  constructor(inputs: FormInput[], redirect: Redirect) {
    this.customOptions = [];
    this.walked = new Set();
    this.inputs = inputs;
    this.redirect = redirect;
    this.index = 0;
    this.history = [];
  }

  protected stack() {
    this.history.push({
      index: this.index,
      inputs: clone(this.inputs),
    });
  }

  protected unstack() {
    const pointInTime = this.history.pop();
    if (pointInTime) {
      this.index = pointInTime.index;
      this.inputs = pointInTime.inputs;
    }
  }

  private get isLeaf() {
    return this.index + 1 > this.inputs.length;
  }

  protected abstract process();

  protected abstract fork(): Promise<Promise<any[]>>;

  protected async execute():Promise<any[]> {
    try {
      return await this.step_if_Taget();
    } catch (e) {}
    try {
      return await this.step_if_all();
    } catch (e) {}
    try {
      return await this.step_if_empty();
    } catch (e) {}
    try {
      return await this.step_if_selected_and_next_emtpy();
    } catch (e) {}
    try {
      return await this.step_if_selected();
    } catch (e) {}

    if (this.isLeaf) {
      this.walked.add(createdPath(this.inputs));
      return this.process();
    }

    if (this.options.length == 1) {
      this.current.options[0].selected = true;
      return this.next().execute();
    }

    return await this.fork();
  }

  protected abstract step_if_Taget();
  protected abstract step_if_all();
  protected abstract step_if_empty();
  protected abstract step_if_selected_and_next_emtpy();
  protected abstract step_if_selected();
}

export function createdPath(inputs: FormInput[]) {
  let path = "";

  for (const inp of inputs) {
    const options = this.removeEmpty(inp.options);
    if (!options.length) return null;
    else {
      const selected = options.find((i) => i.selected).text;
      path += selected;
    }
  }
  return path;
}

// replace -- الكل -- to الكل
export function clean(x: string) {
  return x.replace(/--/g, "").trim();
}

export function selectOpt(ops: FormInput["options"], text: string) {
  return ops.map((e) => ({ ...e, selected: this.clean(e.text) == text }));
}

export function containExactOpt(ops: FormInput["options"], text: string) {
  return ops.some((e) => this.clean(e.text) == text);
}

export function removeEmpty(ops: FormInput["options"]) {
  return ops.filter(
    (e) =>
      !e.text.includes("-- لا يوجد --") &&
      !e.text.includes("-- اختر --") &&
      e.text != "لا يوجد" &&
      e.text != "اختر"
  );
}

export function getSelected(ops: FormInput["options"]) {
  return ops.find((d) => d.selected);
}
