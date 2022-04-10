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
import {
  BackgroundTaskType,
  NoorSection,
  NoorSkill,
  SaveCustomTask,
} from "../../models/home_model";
import DB from "../../repository/db";
import Card from "../../components/home/card";
import Page from "../../layout/home/page";
import { createAction } from "../../layout/home/actionBar";
import SlideTransition from "../../layout/home/slideTransition";

interface SaveCustomProps {}

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

  const next = () => setSecondStage(true);

  const checkSave = async () => {
    if (rating) {
      setLoading(true);
      const task: SaveCustomTask = {
        payload: {
          ...letMeHandleIt(),
          rate: rating,
        } as any,
        completed: false,
        type: BackgroundTaskType.saveCustom,
        user: user!.uid,
      };

      await DB.instance.createTask(task);

      console.log("saving ...");
    }
  };

  const pageTitle = `وحدة ومهارة${teacherTypeArabic(teacherType!)}`;

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
      enable: loadingIndex != -1,
      loading,
      buttons: [
        {
          label: "رصد",
          onClick: checkSave,
          icon: true,
          progress: true,
        },
      ],
    }),
  ];
  return (
    <Page
      title={pageTitle}
      size={secondStage ? "sm" : "lg"}
      loading={!inputs.length}
      actions={actions[secondStage?1:0]}
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
          title={pageTitle}
          onSelect={(e) => setRating(e as any)}
          items={rates(teacherType!)}
        />
      </SlideTransition>
    </Page>
  );
};

export default SaveCustom;
