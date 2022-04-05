import { Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import RadioList from "../../components/home/radioList";
import CustomButton from "../../components/home/customButton";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import rates from "../../models/rating";
import Repository from "../../repository";
import { RatingKinder } from "../../types/home_types";
import { teacherTypeArabic } from "../../utils";
import { NoorSection, NoorSkill } from "../../models/home_model";

interface SaveCustomProps {}

const SaveCustom: React.FC<SaveCustomProps> = () => {
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const { inputs, setForm, updateInputs, loadingIndex } = useFormOptions({
    label: "saveCustom" + teacherType,
    excludedIds: ["PanelSkill"],
    actionName: "",
  });

  useEffect(() => {
    Repository.instance
      .navigateTo({
        account: currentRole!,
        nav1: NoorSection.skill,
        nav2: NoorSkill.skillModuleSkill,
      })
      .then((r) => setForm(r.form))
      .catch(logout);
  }, []);

  const [rating, setRating] = useState<RatingKinder>();

  const [loading, setLoading] = useState(false);
  const [secondStage, setSecondStage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSecondStage(loadingIndex == inputs.length - 1);
    }, 700);
  }, [loadingIndex]);

  const checkSave = async () => {
    if (rating) {
      setLoading(true);
      console.log("saving ...");
    }
  };

  const pageTitle = `وحدة ومهارة${teacherTypeArabic(teacherType)}`;

  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title={pageTitle} />

      <div className="mt-4 b flex-1 flex flex-col max-w-sm mx-auto w-full">
        <div className="flex-1 flex flex-col w-full h-full px-4 bg-white rounded-md shadow  py-4">
          <Transition
            className="flex-1 w-full grid md:grid-cols-2  gap-3"
            show={!secondStage}
          >
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
          </Transition>

          <Transition className={"flex-1"} show={secondStage}>
            <RadioList
              disabled={loading}
              title={pageTitle}
              onSelect={(e) => setRating(e as any)}
              items={rates(teacherType)}
            />
          </Transition>

          <div className="flex mt-4 justify-center space-x-12">
            <button
              onClick={() => setSecondStage(false)}
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

        {/* todo hide button instead of opacity */}
        <div
          className={`my-4 mb-16 text-center ${
            !secondStage ? "opacity-0" : "opacity-100"
          }`}
        >
          <CustomButton loading={loading} onClick={checkSave}>
            رصد
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SaveCustom;
