import { FormInput } from "./form";

//BUG racing with WeiredData !
export async function executeVariant(
  inputs: FormInput[],
  config: {
    execute(inputs: FormInput[]): Promise<any>;
    fetchOptions(inputs: FormInput[], name: string): Promise<FormInput[]>;
    customSelect: { name: string; value: string }[];
  },
  i: number = 0
): Promise<any> {
  if (i + 1 > inputs.length) {
    return await config.execute(inputs);
  }

  const current = inputs[i];
  const left = inputs.slice(0, i);
  const right = inputs.slice(i + 1);

  const options = removeEmpty(current.options);

  const isTarget = config.customSelect.find((e) => e.name == current.name);
  if (isTarget) {
    current.options = selectOpt(options, isTarget.value);
    return await executeVariant(inputs, config, i + 1);
  }

  if (containOpt(options, "الكل")) {
    current.options = selectOpt(options, "الكل");
    return await executeVariant(inputs, config, i + 1);
  } else if (!removeEmpty(options).length) {
    const filled = await config.fetchOptions(inputs, current.name);
    return await executeVariant(filled, config, i);
  } else {
    for (const e of options) {
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
