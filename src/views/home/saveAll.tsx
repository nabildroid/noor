import React, { useContext, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import RadioList, { RadioListItem } from "../../components/home/radioList";
import SavingButton from "../../components/home/savingButton";
import { HomeContext } from "../../context/homeContext";
import rates from "../../models/rating";
import { RatingKinder } from "../../types/home_types";
import { teacherTypeArabic } from "../../utils";

interface SaveAllProps {}

const SaveAll: React.FC<SaveAllProps> = () => {
  const { teacherType } = useContext(HomeContext);
  const [selected, select] = useState<RatingKinder>();
  const [loading, setLoading] = useState(false);

  const checkSave = () => {
    console.log("saving", selected);
    if (selected !== undefined) {
      setLoading(true);
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
          onSelect={(e) => select(e as any)}
          items={rates(teacherType)}
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
