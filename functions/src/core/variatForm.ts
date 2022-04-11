import { clone } from "../utils";
import { FormInput } from "./form";
import Redirect from "./redirect";

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

// FIXME antypattern

//BUG racing with WeiredData !
export async function executeVariant(
  inputsOrg: FormInput[],
  redirect: Redirect,
  config: {
    execute(inputs: FormInput[], redirect: Redirect): Promise<any>;
    fetchOptions(
      inputs: FormInput[],
      name: string,
      redirect: Redirect
    ): Promise<FormInput[]>;
    recreation(redirect: Redirect): Promise<Redirect>;
    customSelect: { name: string; value: string }[];
    walked?: Set<string>;
    isDone?: boolean;
  },
  i: number = 0
): Promise<any> {
  const inputs = clone(inputsOrg);

  if (!config.walked) {
    config.walked = new Set();
    config.isDone = false;
  }

  if (config.isDone) return;

  const last = removeEmpty(inputs[inputs.length - 1].options);
  if (i + 1 > inputs.length && getSelected(last)) {
    const currentPath = createdPath(inputs);
    // FIXME checking here means one wasted network iteration!
    if (currentPath && config.walked.has(currentPath)) {
      config.isDone = true;
      return;
    } else {
      config.walked.add(currentPath);
      await config.execute(inputs, redirect);
      return;
    }
  } else if (i - inputs.length > 0) {
    console.error(
      "iterated through all without catching the last input!",
      config
    );
    return;
  } else if (i + 1 > inputs.length && last.length) {
    i -= 1;
  }

  const current = inputs[i];

  const options = removeEmpty(current.options);
  const nextInputOptions = removeEmpty(inputs[i + 1]?.options ?? []);
  // custom values
  const isTarget = config.customSelect.find((e) => e.name == current.name);
  if (isTarget) {
    current.options = selectOpt(options, isTarget.value);
    return await executeVariant(inputs, redirect, config, i + 1);
  }

  // select all if this option exists
  if (!getSelected(options) && containExactOpt(options, "الكل")) {
    current.options = selectOpt(options, "الكل");
    return await executeVariant(inputs, redirect, config, i + 1);

    // in case of the current options is empty fetch from the parent
  } else if (!options.length) {
    const filled = await config.fetchOptions(
      inputs,
      inputs[i - 1].name,
      redirect
    );
    return await executeVariant(filled, redirect, config, i);
  } else if (getSelected(options) && !nextInputOptions.length) {
    const filled = await config.fetchOptions(inputs, current.name, redirect);
    return await executeVariant(filled, redirect, config, i + 2);
  } else if (getSelected(options)) {
    return await executeVariant(inputs, redirect, config, i + 1);
  } else {
    // create slices
    const notSelectedOptions = options.map((e) => ({
      ...e,
      selected: false,
    }));

    const parts: FormInput["options"][] = [];
    const total = notSelectedOptions.length;
    const slices = Math.round(total / 2);

    let s = 0;
    for (s; s < total; s += slices) {
      parts.push(notSelectedOptions.slice(s, s + slices));
    }

    const tempInputs = clone(inputs);

    current.options = parts.shift();

    const variations = parts.map((part) => {
      const temp = clone(tempInputs);
      temp[i].options = part;
      return temp;
    });

    const newRedirects = await Promise.all(
      parts.map((_) => config.recreation(redirect))
    );

    // include current
    if (!parts.length) {
      parts.unshift(current.options);
      variations.unshift(inputs);
      newRedirects.unshift(redirect);
    }

    const promises = variations.map(async (_, index) => {
      const newRedirect = newRedirects[index];
      const variation = variations[index];
      const part = parts[index];

      const left = variation.slice(0, i);
      const right = variation.slice(i + 1);

      for (const e of removeEmpty(part)) {
        await executeVariant(
          [
            ...left,
            {
              ...current,
              options: selectOpt(part, e.text),
            },
            ...right,
          ],
          newRedirect,
          config,
          i + 1
        );
      }
    });

    return await Promise.all(promises);
  }
}

// replace -- الكل -- to الكل
function clean(x: string) {
  return x.replace(/--/g, "").trim();
}

function selectOpt(ops: FormInput["options"], text: string) {
  return ops.map((e) => ({ ...e, selected: clean(e.text) == text }));
}

function containExactOpt(ops: FormInput["options"], text: string) {
  return ops.some((e) => clean(e.text) == text);
}

function removeEmpty(ops: FormInput["options"]) {
  return ops.filter(
    (e) =>
      !e.text.includes("-- لا يوجد --") &&
      !e.text.includes("-- اختر --") &&
      e.text != "لا يوجد" &&
      e.text != "اختر"
  );
}

function getSelected(ops: FormInput["options"]) {
  return ops.find((d) => d.selected);
}
