import React, { useContext, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import RadioList, { RadioListItem } from "../../components/home/radioList";
import SavingButton from "../../components/home/savingButton";
import { SaveAllContext } from "../../context/home/saveAllContext";
import { HomeContext } from "../../context/homeContext";
import { RatingKinder } from "../../types/home_types";
import { teacherTypeArabic } from "../../utils";

const options: RadioListItem[] = [
  {
    name: "جيد",
    description: "الطلاب عملو بشكل جدي",
    id: RatingKinder.good,
  },
  {
    name: "سيء",
    description: "الطلاب عملو بشكل جدي",
    id: RatingKinder.bad,
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: RatingKinder.unknown,
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: RatingKinder.somewhat,
  },
];

interface SaveAllProps {}

const SaveAll: React.FC<SaveAllProps> = () => {
  const { save } = useContext(SaveAllContext);
  const { teacherType } = useContext(HomeContext);
  const [selected, select] = useState<RatingKinder>();
  const [loading, setLoading] = useState(false);

  const checkSave = () => {
    console.log("saving", selected);
    if (selected !== undefined) {
      setLoading(true);
      save(selected);
    }
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
          onSelect={(v) => select(v as RatingKinder)}
          items={options}
        />

        <div className="mt-4 text-center">
          <SavingButton loading={loading} onClick={checkSave}>
            رصد
          </SavingButton>
        </div>
      </div>
    </div>
  );
};

export default SaveAll;
