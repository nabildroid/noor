import { Transition } from "@headlessui/react";
import React, { useContext, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import RadioList, { RadioListItem } from "../../components/home/radioList";
import SavingButton from "../../components/home/savingButton";
import SelectBox from "../../components/home/selectBox";
import Steper, { Step } from "../../components/home/steper";
import { SaveCustomContext } from "../../context/home/saveCustomContext";
import { HomeContext } from "../../context/homeContext";
import { RatingKinder } from "../../types/home_types";
import { teacherTypeArabic } from "../../utils";

const options: RadioListItem[] = [
  {
    name: "جيد",
    description: "الطلاب عملو بشكل جدي",
    id: RatingKinder.good,
  },
  {
    name: "سيء",
    description: "الطلاب عملو بشكل جدي",
    id: RatingKinder.bad,
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: RatingKinder.unknown,
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: RatingKinder.somewhat,
  },
];

interface SaveCustomProps {}

const SaveCustom: React.FC<SaveCustomProps> = () => {
  const { save } = useContext(SaveCustomContext);
  const { teacherType } = useContext(HomeContext);

  const [loading, setLoading] = useState(false);

  const [secondStage, setSecondStage] = useState(true);

  const checkSave = () => {};

  const pageTitle = `وحدة ومهارة${teacherTypeArabic(teacherType)}`;
  // todo use form automatic submission

  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title={pageTitle} />

      <div className="mt-4 b flex-1 flex flex-col max-w-sm mx-auto w-full">
        <div className="flex-1 flex flex-col w-full h-full px-4 bg-white rounded-md shadow  py-4">
          <Transition className={"flex-1"} show={!secondStage}>
            <div className=" space-y-2">
              <div>
                <SelectBox
                  label="اخةيار الفة"
                  options={[
                    { id: "dsd", name: "dsdsds" },
                    { id: "dsd1", name: "dsdsds" },
                  ]}
                />
              </div>
              <div>
                <SelectBox
                  label="اخةيار الفة"
                  options={[
                    { id: "dsd", name: "dsdsds" },
                    { id: "dsd1", name: "dsdsds" },
                  ]}
                />
              </div>
              <div>
                <SelectBox
                  label="اخةيار الفة"
                  options={[
                    { id: "dsd", name: "dsdsds" },
                    { id: "dsd1", name: "dsdsds" },
                  ]}
                />
              </div>
              <div>
                <SelectBox
                  label="اخةيار الفة"
                  options={[
                    { id: "dsd", name: "dsdsds" },
                    { id: "dsd1", name: "dsdsds" },
                  ]}
                />
              </div>
              <div>
                <SelectBox
                  label="اخةيار الفة"
                  options={[
                    { id: "dsd", name: "dsdsds" },
                    { id: "dsd1", name: "dsdsds" },
                  ]}
                />
              </div>
              <div>
                <SelectBox
                  label="اخةيار الفة"
                  options={[
                    { id: "dsd", name: "dsdsds" },
                    { id: "dsd1", name: "dsdsds" },
                  ]}
                />
              </div>
              <div>
                <SelectBox
                  label="اخةيار الفة"
                  options={[
                    { id: "dsd", name: "dsdsds" },
                    { id: "dsd1", name: "dsdsds" },
                  ]}
                />
              </div>
              <div>
                <SelectBox
                  label="اخةيار الفة"
                  options={[
                    { id: "dsd", name: "dsdsds" },
                    { id: "dsd1", name: "dsdsds" },
                  ]}
                />
              </div>
              <div>
                <SelectBox
                  label="اخةيار الفة"
                  options={[
                    { id: "dsd", name: "dsdsds" },
                    { id: "dsd1", name: "dsdsds" },
                  ]}
                />
              </div>
            </div>
          </Transition>

          <Transition className={"flex-1"} show={secondStage}>
            <RadioList
              disabled={loading}
              title={pageTitle}
              onSelect={() => {}}
              items={options}
            />
          </Transition>

          <div className="flex mt-4 justify-center space-x-12">
            <button
            onClick={()=>setSecondStage(false)}
              className={`block w-3 h-3 rounded-full border-2 border-indigo-600 ${
                loading ? "bg-indigo-500" : ""
              }`}
            ></button>
            <span
              className={`block w-3 h-3 rounded-full border-2 border-indigo-600 ${
                secondStage ? "bg-indigo-500" : ""
              }`}
            ></span>
          </div>
        </div>

        <div
          className={`my-4 mb-16 text-center ${
            !secondStage ? "opacity-0" : "opacity-100"
          }`}
        >
          <SavingButton loading={loading} onClick={checkSave}>
            رصد
          </SavingButton>
        </div>
      </div>
    </div>
  );
};

export default SaveCustom;
