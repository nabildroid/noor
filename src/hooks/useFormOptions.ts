import React, { useEffect, useState } from "react";
import Repository from "../repository";
import { Form, FormInput } from "../types/communication_types";

interface Props {
  label: string;
  excludedIds?: string[];
  actionName: string;
}

export default ({ label, excludedIds, actionName }: Props) => {
  const [form, setForm] = useState<Form>();
  const [inputs, setInputs] = useState<FormInput[]>([]);
  const [loadingIndex, setLoadinIndex] = useState(100);

  const visibleInputs = inputs.filter(
    (e) => !withinIncludes(e.id, excludedIds)
  );

  const updateInputs = async (id: string, value: string) => {
    let requireUpdate = false;
    const newInputs = inputs.map((inp, i) => {
      if (inp.id != id) return inp;
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
      await fetchOptions(newInputs, id, value);
    }
  };

  async function fetchOptions(inputs: FormInput[], id: string, value: string) {
    const index = inputs.findIndex((e) => e.id == id);
    setLoadinIndex(index);
    if (index + 1 < visibleInputs.length) {
      const { form: newForm } = await Repository.instance.formFetchOption({
        action: form!.action,
        id: id,
        inputs,
        actionButtons: form!.actionButtons,
      });

      setForm(newForm);
      setLoadinIndex(1000);
    }
  }

  async function submit() {
    const actionButton = form?.actionButtons.find((e) =>
      e.name?.includes(actionName)
    );

    const action = await Repository.instance.submitForm({
      action: form!.action,
      actionButton: actionButton!,
      inputs: inputs,
    });
  }

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
  return inputs
    .map((input) => ({
      ...input,
      title: input.title.replaceAll("*", ""),
      options: input.options.map((e) => ({
        ...e,
        text: e.text.replaceAll("--", "").trim(),
      })),
    }))
    .filter((e) => e.value != undefined);
}
