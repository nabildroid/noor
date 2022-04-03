import { Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import RadioList, { RadioListItem } from "../../components/home/radioList";
import CustomButton from "../../components/home/customButton";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import rates, { KinderRating } from "../../models/rating";
import Repository from "../../repository";
import { teacherTypeArabic } from "../../utils";
import { EditSkillNavigateResponse } from "../../types/communication_types";

interface EditSkillProps {}

export type Skill = {
  id: string;
  value: string;
  skillId: number;
  title: string;
};

const EditSkill: React.FC<EditSkillProps> = () => {
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const { inputs, setForm, submit, updateInputs, loadingIndex } =
    useFormOptions({
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

  const [student, setStudent] = useState("نبيل العقريب");

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "sddsd",
      title: "hello world",
      value: KinderRating[0].name,
      skillId: 577657,
    },
    {
      id: "sdddzdsd",
      title: "infographya",
      skillId: 15151,
      value: KinderRating[2].name,
    },
    {
      id: "sdddsdsdzdsd",
      title: "ikram dellici",
      skillId: 1515,
      value: KinderRating[3].name,
    },
  ]);

  function setSkillsById(skillId: string, ratingId: number) {
    setSkills((skills) =>
      skills.map((e) => {
        if (e.id == skillId) {
          return {
            ...e,
            value: KinderRating.find((i) => i.id == ratingId)!.name,
          };
        } else return e;
      })
    );
  }
  const skill = stage > 1 ? skills[stage - 2].title : "";
  const isLastSkill = stage == skills.length + 1;

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
    const response = await submit<EditSkillNavigateResponse>("skillSubmit");

    setSkills(response.skills);
  }

  const checkSave = async () => {};
  const back = () => setStage(Math.max(stage - 1, 0));
  const next = () => setStage(Math.min(stage + 1, skills.length + 1));

  const pageTitle = `ةعديل ${teacherTypeArabic(teacherType)}`;

  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title={pageTitle} />

      <div className="mt-4 b flex-1 flex flex-col max-w-sm mx-auto w-full">
        <div className="flex-1  w-full px-4 bg-white  rounded-md shadow  py-4">
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
            <div className="mt-4 flex  justify-center items-stretch space-x-6">
              <CustomButton icon={false} secondary onClick={back}>
                رجوع
              </CustomButton>
              <button
                onClick={() => setStage(2)}
                className="px-4 py-1 text-white font-medium text-sm bg-indigo-700 rounded-md shadow-md shadow-indigo-700/20"
              >
                مهارة على حدة
              </button>
              <CustomButton onClick={() => {}}>رصد</CustomButton>
            </div>
          </Transition>

          {skills.map((s, i) => (
            <Transition key={s.id} className={"flex-1"} show={stage == i + 2}>
              <h3 className="text-indigo-500 font-arabic text-center text-sm">
                {student}
              </h3>
              <h3 className="text-indigo-600 bg-indigo-50 py-1 font-arabic text-center text-md">
                {skill}
              </h3>
              <div className="mt-2">
                <RadioList
                  current={{
                    description: "",
                    id: s.id,
                    name: s.title,
                  }}
                  disabled={loading}
                  title={s.title}
                  onSelect={(e) => setSkillsById(s.id, e as any)}
                  items={rates(teacherType)}
                />
              </div>

              <div className="flex mt-4 flex-row-reverse items-center justify-between">
                <div className="flex-1"></div>
                <div className="flex space-x-2">
                  {/* todo bullet navigation */}
                  {!isLastSkill && (
                    <CustomButton icon={false} onClick={next}>
                      الةالي
                    </CustomButton>
                  )}
                  {isLastSkill && (
                    <CustomButton loading={loading} onClick={checkSave}>
                      رصد
                    </CustomButton>
                  )}
                </div>
                <div className="flex-1 flex justify-between text-right">
                  <CustomButton icon={false} secondary onClick={back}>
                    رجوع
                  </CustomButton>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditSkill;
