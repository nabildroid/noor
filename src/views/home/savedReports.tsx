import { Listbox, Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import CheckTable from "../../components/home/checkTable";
import RadioList, { RadioListItem } from "../../components/home/radioList";
import CustomButton from "../../components/home/customButton";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import rates, { KinderRating } from "../../models/rating";
import Repository from "../../repository";
import { teacherTypeArabic } from "../../utils";
import CheckBoxs from "../../components/home/checkboxs";
import { FormInput } from "../../types/communication_types";
import Noti from "../../components/home/noti";
import WhiteTable from "../../components/home/checkTable";

interface SavedReportsProps {}

const inputs: FormInput[] = [
  {
    id: "dsd",
    title: "الصف",
    options: [
      {
        selected: true,
        text: "الكل",
        value: "dsdsd",
      },
    ],
  },
  {
    id: "dsd11",
    title: "الصف",
    options: [
      {
        selected: true,
        text: "الكل",
        value: "dsdsd",
      },
    ],
  },
];

const SavedReports: React.FC<SavedReportsProps> = () => {
  const { teacherType } = useContext(HomeContext);

  const {
    inputs: inputss,
    setForm,
    submit,
    updateInputs,
    loadingIndex,
  } = useFormOptions({
    label: "SavedReports" + teacherType,
    actionName: "ibtnSearch",
  });

  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title="الةقارير المحفوظة" />

      <div
        className={`mt-4 b flex-1 flex flex-col max-w-sm md:max-w-xl mx-auto w-full`}
      >
        <div className="flex-1 w-full px-4 bg-white  rounded-md shadow py-4">
          <div className="mx-auto max-w-sm w-full">
            {inputs.map((input, i) => (
              <div key={input.id}>
                <SelectBox
                  loading={i > loadingIndex}
                  select={(e) => updateInputs(input.name!, e)}
                  label={input.title}
                  options={input.options.map((e) => ({
                    id: e.value,
                    name: e.text,
                    selected: e.selected,
                  }))}
                />
              </div>
            ))}
          </div>
          <CheckTable />

          <div className="flex space-x-2 justify-center mt-4">
            <CustomButton icon={false} secondary onClick={() => {}}>
              حدف
            </CustomButton>

            <CustomButton onClick={() => {}}>ةحميل</CustomButton>
            <CustomButton icon={false} onClick={() => {}}>
              مشارك
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedReports;
