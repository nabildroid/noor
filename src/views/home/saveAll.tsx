import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import RadioList, { RadioListItem } from "../../components/home/radioList";
import CustomButton from "../../components/home/customButton";
import { HomeContext } from "../../context/homeContext";
import rates from "../../models/rating";
import { RatingKinder } from "../../types/home_types";
import { teacherTypeArabic } from "../../utils";
import Repository from "../../repository";
import { NoorSection, NoorSkill, TeacherType } from "../../models/home_model";
import useFormOptions from "../../hooks/useFormOptions";
import { AppContext } from "../../context/appContext";

interface SaveAllProps {}

const SaveAll: React.FC<SaveAllProps> = () => {
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);
  const [selected, select] = useState<RatingKinder>();
  const [loading, setLoading] = useState(false);

  const { inputs, setForm, formAction, submit } = useFormOptions({
    label: "saveAll" + teacherType,
    actionName: "ibtnSearch",
  });

  useEffect(() => {
    setLoading(true);
    Repository.instance
      .navigateTo({
        account: currentRole!,
        nav1: NoorSection.skill,
        nav2: NoorSkill.skillModuleSkill,
      })
      .then((r) => {
        setForm(r.form);
        setLoading(false);
      })
      .catch(logout);
  }, []);

  const checkSave = async () => {
    console.log("saving", selected);
    if (selected == undefined) return;
    
    setLoading(true);
    await submit("saveAll", {
      rate: selected,
    });
    setLoading(false);
  };

  const pageTitle = `رصد الكل ب${teacherTypeArabic(teacherType)}`;
  // todo use form automatic submission

  return (
    <div>
      <PageTitle title={pageTitle} />

      <div className="mt-4 max-w-sm mx-auto w-full">
        <RadioList
          disabled={loading}
          title={pageTitle}
          onSelect={(e) => select(e as any)}
          items={rates(teacherType)}
        />

        <div className="mt-4 text-center">
          <CustomButton loading={loading} onClick={checkSave}>
            رصد
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SaveAll;
