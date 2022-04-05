import React, { useContext, useEffect } from "react";
import CustomButton from "../../components/home/customButton";
import PageTitle from "../../components/home/pageTitle";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import { NoorExam, NoorSection, NoorSkill } from "../../models/home_model";
import Repository from "../../repository";
import { ReportSubmit } from "../../types/communication_types";

interface SaveReportProps {
  type: NoorSection;
}

const SaveReport: React.FC<SaveReportProps> = ({ type }) => {
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const { inputs, setForm, submit, updateInputs, loadingIndex } =
    useFormOptions({
      label: "report" + teacherType,
      actionName: "",
      excludedNames: ["ddlStudySystem", "ddlSkillTypeDesc", "ddlSkills"],
    });

  function fetchSkill() {
    Repository.instance
      .navigateTo({
        account: currentRole!,
        nav1: NoorSection.skill,
        nav2: NoorSkill.moduleSkill,
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
    if (type == NoorSection.exams) {
      fetchExam();
    } else fetchSkill();
  }, []);

  async function save(isEmpty: boolean = false) {
    if (type == NoorSection.skill) {
      const a = await submit("skillSubmit", {
        skills:[]
      });
      
      
    }
  }

  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title="انشاء ةقرير جديد" />

      <div className="mt-4  b flex-1 flex flex-col max-w-sm mx-auto w-full h-full px-4 bg-white rounded-md shadow  py-4">
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
          <CustomButton secondary icon={false} onClick={() => {}}>
            انشاء فارغ
          </CustomButton>
          <CustomButton icon={false} onClick={() => {}}>
            انشاء مرصود
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SaveReport;
