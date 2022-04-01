import React, { useEffect, useState } from "react";
import Repository from "../repository";
import { Form, FormInput } from "../types/communication_types";

interface Props {
  label: string;
  excludedIds?: string[];
}

export default ({ label, excludedIds }: Props) => {
  const [form, setForm] = useState<Form>();
  const [inputs, setInputs] = useState<FormInput[]>([]);
  const [loadingIndex, setLoadinIndex] = useState(100);


  const visibleInputs = inputs.filter((e) => !withinIncludes(e.id, excludedIds));
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
      });

      setForm(newForm);
      setLoadinIndex(1000);
    }
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
    loadingIndex,
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