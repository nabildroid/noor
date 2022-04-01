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
import { teacherTypeArabic } from "../../utils";

interface EditSkillProps {}

const EditSkill: React.FC<EditSkillProps> = () => {
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const {
    inputs,
    formAction,
    setForm,
    actionButton,
    updateInputs,
    loadingIndex,
  } = useFormOptions({
    label: "editSkill" + teacherType,
    actionName: "ibtnSearch",
  });

  useEffect(() => {
    Repository.instance
      .navigateTo({
        account: currentRole!,
        nav1: "المهارات",
        nav2: "إدخال نتائج المهارة على مستوى طفل ووحدة",
      })
      .then((r) => setForm(r.form))
      .catch(logout);
  }, []);

  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);

  const [student, setStudent] = useState("");
  const [skill, setSkill] = useState("");

  useEffect(() => {
    const isSecondStage = loadingIndex == inputs.length - 1;
    if (isSecondStage) {
      fetchSkills();
      setTimeout(() => setStage(1), 700);
    }
  }, [loadingIndex]);

  useEffect(() => {
    if (stage == 1) {
      const name = inputs
        .find((i) => i.id.includes("PanelStudent"))
        ?.options.find((e) => e.selected)?.text;

      setStudent(name ?? "");
    }
  }, [stage]);

  async function fetchSkills() {
    const action = await Repository.instance.submitForm({
      action: formAction!,
      actionButton: actionButton!,
      inputs: inputs,
    });
  }

  const checkSave = async () => {};

  const pageTitle = `ةعديل ${teacherTypeArabic(teacherType)}`;

  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title={pageTitle} />

      <div className="mt-4 b flex-1 flex flex-col max-w-sm mx-auto w-full">
        <div className="flex-1 flex flex-col w-full h-full px-4 bg-white rounded-md shadow  py-4">
          <Transition
            className="flex-1 w-full grid md:grid-cols-2  gap-3"
            show={stage == 0}
          >
            {inputs.map((input, i) => (
              <div key={input.id}>
                <SelectBox
                  loading={i > loadingIndex}
                  select={(e) => updateInputs(input.id, e)}
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

          <Transition className={"flex-1"} show={stage == 1}>
            <h3 className="text-indigo-500 font-arabic text-center text-sm">
              {student}
            </h3>
            <div className="mt-2">
              <RadioList
                disabled={loading}
                title={pageTitle}
                onSelect={(e) => {}}
                items={rates(teacherType)}
              />
            </div>
            <div className="mt-4 flex justify-center items-stretch space-x-6">
              <CustomButton onClick={() => {}}>رصد</CustomButton>

              <button
                onClick={() => setStage(2)}
                className="px-4 py-1 text-white font-medium text-sm bg-indigo-700 rounded-md shadow-md shadow-indigo-700/20"
              >
                مهارة على حدة
              </button>
            </div>
          </Transition>
          <Transition className={"flex-1"} show={stage == 2}>
            <h3 className="text-indigo-500 font-arabic text-center text-sm">
              {student}
            </h3>
            <h3 className="text-indigo-600 bg-indigo-50 py-1 font-arabic text-center text-md">
              {skill}
            </h3>
            <div className="mt-2">
              <RadioList
                disabled={loading}
                title={pageTitle}
                onSelect={(e) => {}}
                items={rates(teacherType)}
              />
            </div>

            <div className="flex mt-4 items-center justify-between">
              <div className="flex-1"></div>
              <div className="flex space-x-2">
                {Array(5)
                  .fill(null)
                  .map((e) => (
                    <span className="w-3 h-3 rounded-full border-2 border-indigo-600"></span>
                  ))}
              </div>
              <div className="flex-1 text-right">
                <CustomButton icon={false} secondary onClick={() => {}}>
                  back
                </CustomButton>
              </div>
            </div>
          </Transition>
        </div>

        {/* todo hide button instead of opacity */}
        <div
          className={`my-4 mb-16 text-center ${
            stage != 3 ? "opacity-0" : "opacity-100"
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

export default EditSkill;
