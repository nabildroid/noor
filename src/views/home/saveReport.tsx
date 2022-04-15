import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  TeacherType
} from "../../models/home_model";
import Repository from "../../repository";
import { tabBarTitle } from "../../utils";

interface SaveReportProps {
  type1?: boolean;
}

function fetchSkill(account: string, type1?: boolean) {
  return Repository.instance.navigateTo({
    account: account,
    nav1: NoorSection.skill,
    nav2: type1 ? NoorSkill.moduleSkill : NoorSkill.skillModuleSkill,
  });
}

function fetchExam(account: string) {
  return Repository.instance.navigateTo({
    account: account,
    nav1: NoorSection.exams,
    nav2: NoorExam.enter,
  });
}

function pageTitle(type: TeacherType) {
  return tabBarTitle(HomeTab.saveReport, type);
}

function fetch(type: TeacherType, account: string, type1?: boolean) {
  if (type == TeacherType.kindergarten || type1) {
    return fetchSkill(account, type1);
  }
  return fetchExam(account);
}

const SaveReport: React.FC<SaveReportProps> = ({type1}) => {
  const navigate = useNavigate();

  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const { inputs, setForm, submit, isAllChosen, updateInputs, loadingIndex } =
    useFormOptions({
      excludedNames: [
        TeacherType.kindergarten
          ? "ddlStudySystem"
          : "one of the hardest progets i ever do!",
        "ddlSkillTypeDesc",
        "ddlSkill",
      ],
      actionName:
        teacherType == TeacherType.kindergarten  ? "ibtnSearch" :  type1 ? "10":"btY21",
      isPrimary: teacherType == TeacherType.primary,
    });

  useEffect(() => {
    fetch(teacherType!, currentRole!,type1)
      .then((r) => setForm(r.form))
      .catch(logout);
  }, []);

  async function save(isEmpty: boolean = false) {
    const isExams = teacherType == TeacherType.primary && !type1;
    await submit(isExams ? "newExamReport" : "newSkillReport", {
      isEmpty,
    });

    navigate("/" + HomeTab.savedReports);
  }

  const actions = createAction({
    // enable: isAllChosen && loadingIndex != -1,
    buttons: [
      {
        label: "انشاء فارغ",
        onClick: () => save(true),
        secondary: true,
        progress: true,
      },
      {
        label: "انشاء مرصود",
        onClick: () => save(),
        progress: true,
      },
    ],
  });

  const title = pageTitle(teacherType!);

  return (
    <Page title={title} loading={!inputs.length} actions={actions}>
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
