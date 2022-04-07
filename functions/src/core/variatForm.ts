import { clone } from "../utils";
import { FormInput } from "./form";

function createdPath(inputs: FormInput[]) {
  let path = "";

  for (const inp of inputs) {
    const options = removeEmpty(inp.options);
    if (!options.length) return null;
    else {
      const selected = options[0].text;
      path += selected;
    }
  }
  return path;
}

// FIXME antypattern
const walked = new Set<string>();
let isDone = false;
//BUG racing with WeiredData !
export async function executeVariant(
  inputsOrg: FormInput[],
  config: {
    execute(inputs: FormInput[]): Promise<any>;
    fetchOptions(inputs: FormInput[], name: string): Promise<FormInput[]>;
    customSelect: { name: string; value: string }[];
  },
  i: number = 0
): Promise<any> {
  const inputs = clone(inputsOrg);

  if (isDone) return;
  
  if (i + 1 > inputs.length) {
    const currentPath = createdPath(inputs);
    // FIXME checking here means one wasted network iteration!
    if (currentPath && walked.has(currentPath)) {
      isDone =  true;
      return;
    } else walked.add(currentPath);

    const last = inputs[inputs.length - 1];
    for (const o of removeEmpty(last.options)) {
      await config.execute([
        ...inputs.slice(0, inputs.length - 1),
        {
          ...last,
          options: selectOpt(last.options, o.text),
        },
      ]);
    }

    return;
  }

  const current = inputs[i];

  const left = inputs.slice(0, i);
  const right = inputs.slice(i + 1);

  const options = removeEmpty(current.options);

  // custom values
  const isTarget = config.customSelect.find((e) => e.name == current.name);
  if (isTarget) {
    current.options = selectOpt(options, isTarget.value);
    return await executeVariant(inputs, config, i + 1);
  }

  // select all if this option exists
  if (containOpt(options, "الكل")) {
    current.options = selectOpt(options, "الكل");
    return await executeVariant(inputs, config, i + 1);

    // in case of the current options is empty fetch from the parent
  } else if (!options.length) {
    const filled = await config.fetchOptions(inputs, inputs[i - 1].name);
    return await executeVariant(filled, config, i - 1);
  } else if (getSelected(options)) {
    const filled = await config.fetchOptions(inputs, current.name);
    return await executeVariant(filled, config, i + 2);
  } else {
    // for each option select one
    for (const e of removeEmpty(options)) {
      await executeVariant(
        [
          ...left,
          {
            ...current,
            options: selectOpt(options, e.text),
          },
          ...right,
        ],
        config,
        i + 1
      );
    }
    return;
  }
}

function selectOpt(ops: FormInput["options"], text: string) {
  return ops.map((e) => ({ ...e, selected: e.text == text }));
}

function containOpt(ops: FormInput["options"], text: string) {
  return ops.some((e) => e.text.includes(text));
}

function removeEmpty(ops: FormInput["options"]) {
  return ops.filter(
    (e) => !e.text.includes("لا يوجد") && !e.text.includes("اختر")
  );
}

function getSelected(ops: FormInput["options"]) {
  return ops.find((d) => d.selected);
}
