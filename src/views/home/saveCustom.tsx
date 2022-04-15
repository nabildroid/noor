import React, { useContext, useEffect, useState } from "react";
import RadioList from "../../components/home/radioList";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import { createAction } from "../../layout/home/actionBar";
import Page from "../../layout/home/page";
import SlideTransition from "../../layout/home/slideTransition";
import {
  BackgroundTaskType,
  NoorSection,
  NoorSkill,
  SaveCustomTask,
  TeacherType
} from "../../models/home_model";
import rates, { Rating } from "../../models/rating";
import Repository from "../../repository";
import DB from "../../repository/db";
import { teacherTypeArabic, wait } from "../../utils";

interface SaveCustomProps {}

function fetch(account: string, type: TeacherType) {
  const nav2 =
    type == TeacherType.kindergarten
      ? NoorSkill.skillModuleSkill
      : NoorSkill.moduleSkill;

  return Repository.instance.navigateTo({
    account,
    nav1: NoorSection.skill,
    nav2,
  });
}

function pageTitle(type: TeacherType) {
  if(type == TeacherType.kindergarten)
  return `وحدة ومهارة ${teacherTypeArabic(type)}`;
  return `مادة ومهارة ${teacherTypeArabic(type)}`;
}

const SaveCustom: React.FC<SaveCustomProps> = () => {
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout, user } = useContext(AppContext);

  const {
    inputs,
    isAllChosen,
    setForm,
    letMeHandleIt,
    updateInputs,
    loadingIndex,
  } = useFormOptions({
    excludedNames: ["ddlSkills"],
    actionName:teacherType == TeacherType.primary?"ibtnS10": "ibtnSearch",
  });

  useEffect(() => {
    fetch(currentRole!, teacherType!)
      .then((r) => setForm(r.form))
      .catch(logout);
  }, []);

  const [rating, setRating] = useState<Rating>();

  const [loading, setLoading] = useState(false);
  const [secondStage, setSecondStage] = useState(false);

  const next = () => setSecondStage(true);

  const save = () => {
    const task: SaveCustomTask = {
      payload: {
        ...letMeHandleIt(),
        rate: rating,
      } as any,
      completed: false,
      type: BackgroundTaskType.saveCustom,
      user: user!.uid,
    };

    wait(() => DB.instance.createTask(task), setLoading);
  };

  const actions = [
    createAction({
      show: !!inputs.length,
      enable: isAllChosen && loadingIndex != -1,
      buttons: [
        {
          label: "التالي",
          onClick: next,
        },
      ],
    }),
    createAction({
      show: secondStage,
      enable: loadingIndex != -1 && !!rating,
      loading,
      buttons: [
        {
          label: "رصد",
          onClick: save,
          icon: true,
          progress: true,
        },
      ],
    }),
  ];

  const title = pageTitle(teacherType!);

  return (
    <Page
      title={title}
      size={secondStage ? "sm" : "lg"}
      loading={!inputs.length}
      actions={actions[secondStage ? 1 : 0]}
    >
      <SlideTransition
        show={!secondStage}
        isRtl
        className="flex-1  w-full grid md:grid-cols-2 h-full gap-3 "
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

      <SlideTransition show={secondStage}>
        <RadioList
          disabled={loading}
          title={title}
          onSelect={(e) => setRating(e as any)}
          items={rates(teacherType!)}
        />
      </SlideTransition>
    </Page>
  );
};

export default SaveCustom;
