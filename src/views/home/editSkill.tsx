import React, { useContext, useEffect, useState } from "react";
import RadioList from "../../components/home/radioList";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import useIfIffect from "../../hooks/useIfEffect";
import { createAction } from "../../layout/home/actionBar";
import Page from "../../layout/home/page";
import SlideTransition from "../../layout/home/slideTransition";
import { NoorSection, NoorSkill, TeacherType } from "../../models/home_model";
import rates, {
  KinderRating,
  RateById,
  RateByName,
  RateToId
} from "../../models/rating";
import Repository from "../../repository";
import { teacherTypeArabic, wait } from "../../utils";

interface EditSkillProps {}

export type Skill = {
  id: string;
  value: string;
  skillId: number;
  title: string;
};

function pageTitle(type: TeacherType) {
  return `تعديل ${teacherTypeArabic(type)}`;
}

function fetch(account: string, type: TeacherType) {
  const nav2 =
    type == TeacherType.kindergarten
      ? NoorSkill.skillModuleChild
      : NoorSkill.moduleStudent;

  return Repository.instance.navigateTo({
    account: account,
    nav1: NoorSection.skill,
    nav2,
  });
}

const EditSkill: React.FC<EditSkillProps> = () => {
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const ratingSystem = KinderRating;
  const {
    inputs,
    setForm,
    formAction,
    submit,
    updateInputs,
    loadingIndex,
    isAllChosen,
  } = useFormOptions({
    actionName: teacherType == TeacherType.primary ? "Rtb44" : "ibtnSearch",
  });

  useEffect(() => {
    fetch(currentRole!, teacherType!)
      .then((r) => setForm(r.form))
      .catch(logout);
  }, []);

  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);

  const [student, setStudent] = useState("");
  const [allOneSkill, setAllOneSkill] = useState(ratingSystem[0]);

  const [skills, setSkills] = useState<Skill[]>([]);

  function setSkillsById(skillId: number, ratingId: number) {
    setSkills((skills) =>
      skills.map((e) => {
        if (e.skillId == skillId) {
          return {
            ...e,
            value: ratingSystem.find((i) => i.id == ratingId)!.name,
          };
        } else return e;
      })
    );
  }

  useIfIffect(() => {
    const name = inputs
      .find((i) => i.id.includes("PanelStudent"))
      ?.options.find((e) => e.selected)?.text;

    setStudent(name ?? "");
    fetchSkills();
  }, [stage == 1]);

  function fetchSkills() {
    wait(async () => {
      const response = await submit("skillSubmit", {});
      setSkills(response.skills);
    }, setLoading);
  }

  const saveCustom = () =>
    wait(async () => {
      const editedSkills = skills.map((s) => ({
        id: s.skillId,
        value: RateToId(s.value).toString(),
      }));
      const data = await Repository.instance.editSkillSave({
        action: formAction!,
        inputs,
        skills: editedSkills,
      });

      setForm(data.form);
      setStage(0);
    }, setLoading);

  const back = () => setStage(Math.max(stage - 1, 0));
  const next = () => setStage(Math.min(stage + 1, skills.length + 1));

  const save = () =>
    wait(async () => {
      const data = await Repository.instance.editSkillSave({
        action: formAction!,
        inputs,
        skills: skills.map((s) => ({
          id: s.skillId,
          value: allOneSkill.id as any,
        })),
      });

      setForm(data.form);
      setStage(0);
    }, setLoading);

  const skill = stage > 1 && skills.length ? skills[stage - 2].title : "";
  const isLastSkill = stage == skills.length + 1;

  const title = pageTitle(teacherType!);

  const actions = [
    createAction({
      enable: isAllChosen,
      show: stage == 0,
      buttons: [
        {
          label: "التالي",
          onClick: () => setStage(1),
        },
      ],
    }),
    createAction({
      show: stage == 1,
      loading: false && (loading || loadingIndex == -1),
      buttons: [
        {
          label: "رجوع",
          onClick: back,
          secondary: true,
        },
        {
          label: "مهارة على حدة",
          onClick: () => setStage(2),
        },
        {
          label: "رصد",
          onClick: save,
          icon: true,
          progress: true,
        },
      ],
    }),

    createAction({
      loading: loading || loadingIndex == -1,
      buttons: [
        {
          label: "رصد",
          progress: true,
          onClick: saveCustom,
          icon: true,
          visible: isLastSkill,
        },
        {
          label: "رجوع",
          secondary: true,
          progress: true,
          onClick: back,
        },
        {
          label: "التالي",
          onClick: next,
          visible: !isLastSkill,
        },
      ],
    }),
  ];

  return (
    <Page
      size={stage == 0 ? "lg" : "sm"}
      title={title}
      actions={actions[Math.min(stage, 2)]}
      loading={!inputs.length}
    >
      <SlideTransition
        className="h-full w-full grid md:grid-cols-2 gap-3 gap-y-1"
        show={stage == 0}
        isRtl
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
      </SlideTransition>

      <SlideTransition className="flex-1" show={stage == 1}>
        <h3 className="text-indigo-500 font-arabic text-center text-sm">
          {student}
        </h3>
        <div className="mt-2">
          <RadioList
            disabled={loading}
            title={title}
            onSelect={(e) => setAllOneSkill(RateById(ratingSystem, e as any))}
            items={rates(teacherType!)}
          />
        </div>
      </SlideTransition>

      {skills.map((s, i) => (
        <SlideTransition key={s.id} className="flex-1" show={stage == i + 2}>
          <h3 className="text-indigo-500 font-arabic text-center text-sm">
            {student}
          </h3>
          <h3 className="text-indigo-600 bg-indigo-50 py-1 font-arabic text-center text-md">
            {skill}
          </h3>
          <div className="mt-2">
            <RadioList
              current={RateByName(ratingSystem, s.value)}
              disabled={loading}
              title={s.title}
              onSelect={(e) => setSkillsById(s.skillId, e as any)}
              items={rates(teacherType!)}
            />
          </div>
        </SlideTransition>
      ))}
    </Page>
  );
};

export default EditSkill;
