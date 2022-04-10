import { Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import RadioList, { RadioListItem } from "../../components/home/radioList";
import CustomButton from "../../components/home/customButton";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import rates, {
  RateByName,
  KinderRating,
  RateById,
  RateToId,
} from "../../models/rating";
import Repository from "../../repository";
import { teacherTypeArabic } from "../../utils";
import { EditSkillNavigateResponse } from "../../types/communication_types";
import { NoorSection, NoorSkill, TeacherType } from "../../models/home_model";
import Card from "../../components/home/card";
import Page from "../../layout/home/page";
import SlideTransition from "../../layout/home/slideTransition";
import { createAction } from "../../layout/home/actionBar";

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
    label: "editSkill" + teacherType,
    actionName: "ibtnSearch",
  });

  useEffect(() => {
    console.log("teacher type:", teacherType);
    const type =
      teacherType == TeacherType.kindergarten
        ? NoorSkill.skillModuleChild
        : NoorSkill.moduleStudent;

    Repository.instance
      .navigateTo({
        account: currentRole!,
        nav1: NoorSection.skill,
        nav2: type,
      })
      .then((r) => setForm(r.form))
      .catch(logout);
  }, []);

  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);

  const [student, setStudent] = useState("");

  const [skills, setSkills] = useState<Skill[]>([]);

  const [allOneSkill, setAllOneSkill] = useState(ratingSystem[0]);

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

  const skill = stage > 1 && skills.length ? skills[stage - 2].title : "";

  const isLastSkill = stage == skills.length + 1;

  useEffect(() => {
    if (stage == 1) {
      fetchSkills();
    }
  }, [stage]);

  useEffect(() => {
    if (stage == 1) {
      const name = inputs
        .find((i) => i.id.includes("PanelStudent"))
        ?.options.find((e) => e.selected)?.text;

      setStudent(name ?? "");
    }
  }, [stage]);

  async function fetchSkills() {
    setLoading(true);
    const response = await submit("skillSubmit", {});

    setSkills(response.skills);
    setLoading(false);
  }

  const checkSave = async () => {
    setLoading(true);
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
    setLoading(false);
  };
  const back = () => setStage(Math.max(stage - 1, 0));
  const next = () => {
    setStage(Math.min(stage + 1, skills.length + 1));
  };

  const save = async () => {
    setLoading(true);
    const data = await Repository.instance.editSkillSave({
      action: formAction!,
      inputs,
      skills: skills.map((s) => ({
        id: s.skillId,
        value: allOneSkill.id as any,
      })),
    });

    setLoading(false);
    setForm(data.form);
    setStage(0);
  };

  const pageTitle = `تعديل ${teacherTypeArabic(teacherType!)}`;

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
      loading: loading || loadingIndex == -1,
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
          onClick: checkSave,
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
      title={pageTitle}
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
        <RadioList
          disabled={loading}
          title={pageTitle}
          onSelect={(e) => setAllOneSkill(RateById(ratingSystem, e as any))}
          items={rates(teacherType!)}
        />
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
