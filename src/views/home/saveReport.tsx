import React, { useContext, useEffect } from "react";
import Card from "../../components/home/card";
import CustomButton from "../../components/home/customButton";
import PageTitle from "../../components/home/pageTitle";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import {
  NoorExam,
  NoorSection,
  NoorSkill,
  TeacherType,
} from "../../models/home_model";
import Repository from "../../repository";

interface SaveReportProps {}

const SaveReport: React.FC<SaveReportProps> = ({}) => {
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const { inputs, setForm, submit, updateInputs, loadingIndex } =
    useFormOptions({
      label: "report" + teacherType,
      actionName: "",
      excludedIds:["PanelSkill"],
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
    const a = await submit("newSkillReport", {
      isEmpty
    });
  }

  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title="انشاء تقرير جديد" />

      <div className="mt-4 h-full   flex flex-col max-w-sm mx-auto w-full  overflow-hidden  rounded-md ">
        <Card loading={!inputs.length}>
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

        <div className="flex mt-4 justify-between">
          <CustomButton secondary icon={false} onClick={() => {save(true)}}>
            انشاء فارغ
          </CustomButton>
          <CustomButton icon={false} onClick={() => {save()}}>
            انشاء مرصود
          </CustomButton>
        </div>
        </Card>
      </div>
    </div>
  );
};

export default SaveReport;
