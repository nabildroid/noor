import React, { createContext, useContext, useEffect, useState } from "react";
import Repository from "../../repository";
import { Form, FormInput } from "../../types/communication_types";
import { RatingKinder } from "../../types/home_types";
import { AppContext } from "../appContext";
import { HomeContext } from "../homeContext";

export interface ISaveCustomContext {
  save(rate: RatingKinder): Promise<void>;
  inputs: FormInput[];
  updateInputs(id: string, value: string): void;
  loadingIndex: number;
}

export const SaveCustomContext = createContext<ISaveCustomContext>(null!);

const SaveCustomProvider: React.FC = ({ children }) => {
  const { tab, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const [form, setForm] = useState<Form>();
  const [inputs, setInputs] = useState<FormInput[]>([]);
  const [loadingIndex, setLoadinIndex] = useState(100);

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

    const { form: newForm } = await Repository.instance.formFetchOption({
      action: form!.action,
      id: id,
      inputs,
    });

    setForm(newForm);
    setLoadinIndex(1000);
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

  useEffect(() => {
    const cachedForm = localStorage.getItem("form");
    if (cachedForm) {
      setForm(JSON.parse(cachedForm));
    } else {
      getData().catch(logout);
    }
  }, []);

  useEffect(() => {
    if (form) {
      setInputs(formatInputs(form.inputs));
    }
  }, [form]);

  async function getData() {
    const { form } = await Repository.instance.navigateTo({
      account: currentRole!,
      nav1: "المهارات",
      nav2: "إدخال نتائج المهارة على مستوى طفل ووحدة",
    });

    setForm(form);

    const formatedInput = form.inputs
      .map((input) => ({
        ...input,
        title: input.title.replaceAll("*", ""),
        options: input.options.filter((e) => !e.text.includes("-- اختر --")),
      }))
      .filter((e) => e.value != undefined);
    setInputs(formatedInput);
  }

  async function save(rate: RatingKinder) {}

  const values = {
    save,
    inputs,
    updateInputs,
    loadingIndex,
  };

  return (
    <SaveCustomContext.Provider value={values}>
      {children}
    </SaveCustomContext.Provider>
  );
};

export default SaveCustomProvider;
