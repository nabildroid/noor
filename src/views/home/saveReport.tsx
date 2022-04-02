import React from "react";
import CustomButton from "../../components/home/customButton";
import PageTitle from "../../components/home/pageTitle";
import SelectBox from "../../components/home/selectBox";

interface SaveReportProps {}

const SaveReport: React.FC<SaveReportProps> = () => {
  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title="انشاء ةقرير جديد" />

      <div className="mt-4  b flex-1 flex flex-col max-w-sm mx-auto w-full h-full px-4 bg-white rounded-md shadow  py-4">
      {Array(5)
            .fill("")
            .map((e) => (
                <div className="mb-3">
              <SelectBox
                loading={false}
                select={() => {}}
                label="مرحبا باعالم"
                options={[
                  {
                    id: "dsd",
                    name: "dsd",
                    selected: false,
                  },
                ]}
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
