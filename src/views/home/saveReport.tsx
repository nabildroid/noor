import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/home/card";
import CustomButton from "../../components/home/customButton";
import PageTitle from "../../components/home/pageTitle";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import { createAction } from "../../layout/home/actionBar";
import Page from "../../layout/home/page";
import {
  HomeTab,
  NoorExam,
  NoorSection,
  NoorSkill,
  TeacherType,
} from "../../models/home_model";
import Repository from "../../repository";

interface SaveReportProps {}

const SaveReport: React.FC<SaveReportProps> = ({}) => {
  const navigate = useNavigate();
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const { inputs, setForm, submit, isAllChosen, updateInputs, loadingIndex } =
    useFormOptions({
      label: "report" + teacherType,
      actionName: "",
      excludedIds: ["PanelSkill"],
      excludedNames: ["ddlStudySystem", "ddlSkillTypeDesc", "ddlSkills"],
    });

  function fetchSkill() {
    Repository.instance
      .navigateTo({
        account: currentRole!,
        nav1: NoorSection.skill,
        nav2: NoorSkill.skillModuleSkill,
      })
      .then((r) => setForm(r.form))
      .catch(logout);
  }

  function fetchExam() {
    Repository.instance
      .navigateTo({
        account: currentRole!,
        nav1: NoorSection.exams,
        nav2: NoorExam.enter,
      })
      .then((r) => setForm(r.form))
      .catch(logout);
  }

  useEffect(() => {
    if (teacherType == TeacherType.kindergarten) {
      fetchSkill();
    } else fetchExam();
  }, []);

  async function save(isEmpty: boolean = false) {
    if (loadingIndex != 1000) return;
    await submit("newSkillReport", {
      isEmpty,
    });

    navigate("/" + HomeTab.savedReports);
  }

  const actions = createAction({
    enable: isAllChosen && loadingIndex != -1,
    buttons: [
      {
        label: "انشاء فارغ",
        onClick: () => save(true),
        secondary: true,
        progress: true,
      },
      {
        label: "انشاء مرصود",
        onClick: save,
        progress: true,
      },
    ],
  });
  return (
    <Page title="انشاء تقرير جديد" loading={!inputs.length} actions={actions}>
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
    </Page>
  );
};

export default SaveReport;
