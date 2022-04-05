import React, { useEffect, useState } from "react";
import Repository from "../repository";
import {
  Form,
  FormInput,
  FormSubmit,
  FormSubmitLookup,
  NavigationResponse,
} from "../types/communication_types";

interface Props {
  label: string;
  excludedIds?: string[];
  excludedNames?: string[];
  actionName: string;
}

type SubmitType = <
  T extends FormSubmitLookup["type"],
  B extends Omit<FormSubmitLookup & { type: T }, "type">,
  C extends Omit<B["payload"], keyof FormSubmit>,
  D extends FormSubmitLookup & { type: T }
>(
  type: T,
  payload: C
) => Promise<D["response"]["payload"]>;



// todo use label to cach data
export default ({ label, excludedIds, excludedNames, actionName }: Props) => {
  const [form, setForm] = useState<Form>();
  const [inputs, setInputs] = useState<FormInput[]>([]);
  const [loadingIndex, setLoadinIndex] = useState(100);

  const visibleInputs = inputs.filter(
    (e) =>
      !withinIncludes(e.id, excludedIds) &&
      !withinIncludes(e.name ?? "", excludedNames)
  );

  const updateInputs = async (name: string, value: string) => {
    let requireUpdate = false;
    const newInputs = inputs.map((inp, i) => {
      if (inp.name != name) return inp;
      else {
        if (!inp.options.find((e) => e.selected && e.value == value)) {
          requireUpdate = true;
        }
        return {
          ...inp,
          options: inp.options.map((e) => ({
            ...e,
            selected: e.value == value,
          })),
        };
      }
    });

    if (requireUpdate) {
      setInputs(newInputs);
      await fetchOptions(newInputs, name, value);
    }
  };

  async function fetchOptions(
    inputs: FormInput[],
    name: string,
    value: string
  ) {
    const index = inputs.findIndex((e) => e.name == name);
    setLoadinIndex(index);
    if (true && index + 1 < visibleInputs.length) {
      const { form: newForm } = await Repository.instance.formFetchOption({
        action: form!.action,
        name,
        inputs,
        actionButtons: form!.actionButtons,
      });

      setForm(newForm);
      setLoadinIndex(1000);
    }
  }

  const submit: SubmitType = async (type, payload) => {
    const actionButton = form?.actionButtons.find((e) =>
      e.name?.includes(actionName)
    );

    const action = await Repository.instance.submitForm(type, {
      ...payload, // CHECK should i deconstruct the payload or not
      action: form!.action,
      actionButton: actionButton!,
      inputs: inputs,
    });

    return action as any;
  };

  useEffect(() => {
    if (form) {
      setInputs(formatInputs(form.inputs));
    }
  }, [form]);

  return {
    updateInputs,
    inputs: visibleInputs,
    setForm,
    formAction: form?.action,
    loadingIndex,
    submit,
  };
};

function withinIncludes(id: string, ids?: string[]) {
  if (!ids) return false;
  else {
    return ids.some((e) => id.includes(e));
  }
}

function formatInputs(inputs: FormInput[]) {
  return (
    inputs
      .map((input, i) => ({
        ...input,
        title: input.title.replaceAll("*", ""),
        options: input.options.map((e) => ({
          ...e,
          text: e.text.replaceAll("--", "").trim(),
        })),
      }))
      // CHECK e.options for inputs that provide only informations!
      .filter((e) => e.value != undefined && e.title != "" && e.options.length)
  );
}
