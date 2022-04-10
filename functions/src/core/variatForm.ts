import { fetchOptions } from "../endpoints/callables/incremental/formOptions";
import { clone } from "../utils";
import { FormInput } from "./form";
import Redirect from "./redirect";
import {
  AbstractVariation,
  containExactOpt,
  getSelected,
  removeEmpty,
  selectOpt
} from "./variation";

function createdPath(inputs: FormInput[]) {
  let path = "";

  for (const inp of inputs) {
    const options = removeEmpty(inp.options);
    if (!options.length) return null;
    else {
      const selected = options.find((i) => i.selected).text;
      path += selected;
    }
  }
  return path;
}

const SPLIT = 2;

abstract class Variation<T> extends AbstractVariation {
  // manuel handling
  protected step_if_Taget() {
    const isTarget = this.customOptions.find(
      (e) => e.name == this.current.name
    );
    if (isTarget) {
      this.current.options = selectOpt(this.options, isTarget.value);

      return this.next().execute();
    }
    throw Error("next step  2!");
  }
  // prefere all option // CHECK if this is the case for all usecases
  protected step_if_all(): Promise<any> {
    if (!getSelected(this.options) && containExactOpt(this.options, "الكل")) {
      this.current.options = selectOpt(this.options, "الكل");
      return this.next().execute();
    }
    throw Error("next step  3!");
  }
  // doesn't contain any options because the prev input didn't got submited
  protected async step_if_empty(): Promise<any> {
    if (!this.options.length) {
      await this.prev().fetchOptions();
      return this.next().execute();
    }
    throw Error("next step 4!");
  }
  // contain a selected option but the next one doesn't !
  protected step_if_selected_and_next_emtpy(): Promise<any> {
    if (getSelected(this.options) && !this.nextInputOption?.length) {
      this.fetchOptions();
      return this.next().next().execute();
    }
    throw Error("next step 5!");
  }
  protected step_if_selected(): Promise<any> {
    if (getSelected(this.options)) {
      return this.next().execute();
    }
    throw Error("next step 6!");
  }

  constructor(inputs: FormInput[], redirect: Redirect) {
    super(inputs, redirect);
  }

  protected abstract get formAction(): string;

  private async fetchOptions(): Promise<void> {
    const response = await fetchOptions(
      {
        inputs: this.inputs,
        ...this.redirect.send({}),
        action: this.formAction,
        actionButtons: [],
        name: this.current.name,
      },
      this.redirect
    );
    // submit the form
    this.inputs = response.toJson().inputs;
  }

  iterateOptions() {
    return this.options.map(async (o) => {
      this.stack();
      this.current.options.map((e) => ({
        ...e,
        selected: e.text == o.text,
      }));
      const data = await this.next().execute();
      this.unstack();
      return data;
    });
  }

  run() {
    return this.execute();
  }

  protected abstract process(): T;

  protected async fork() {
    const notSelectedOptions = this.options.map((e) => ({
      ...e,
      selected: false,
    }));
    const parts: FormInput["options"][] = [];
    const total = notSelectedOptions.length;
    const slices = Math.round(total / SPLIT);
    let i = 0;
    for (i; i < total; i += slices) {
      parts.push(notSelectedOptions.slice(i, i + slices));
    }

    const tempInputs = clone(this.inputs);

    this.current.options = parts.shift();

    const variations = parts.map((part) => {
      const temp = clone(tempInputs);
      temp[this.index].options = part;
      return temp;
    });

    const instances = await Promise.all(
      variations.map((inputs) => this.create(inputs))
    );

    await Promise.all(instances.map((v) => v.recreation()));

    return [this, ...instances].map((c) => c.iterateOptions());
  }

  protected abstract create(inputs: FormInput[]): Promise<Variation<T>>;

  protected abstract navigation(): [string, string];

  async recreation() {

    process.exit();
  }
}

export class SkillVariant extends Variation<string> {
  protected formAction: string;

  constructor(inputs: FormInput[], action: string, redirect: Redirect) {
    super(inputs, redirect);

    this.formAction = action;
  }

  protected navigation(): [string, string] {
    return ["nav1", "nav2"];
  }

  protected process(): string {
    this.inputs;
    console.log(this.inputs);
    throw new Error("Method not implemented.");
  }

  protected async create(inputs: FormInput[]) {
    const params = this.redirect.send({});

    const redirect = await Redirect.start({
      cookies: params.cookies,
      from: params.from,
    });
    return new SkillVariant(inputs, this.formAction, redirect);
  }
}
