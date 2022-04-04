import { Listbox, Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import RadioList, { RadioListItem } from "../../components/home/radioList";
import CustomButton from "../../components/home/customButton";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import rates, { KinderRating } from "../../models/rating";
import Repository from "../../repository";
import { teacherTypeArabic } from "../../utils";
import { Presense } from "../../types/home_types";
import CheckBoxs from "../../components/home/checkboxs";

interface SaveDegreeProps {}

type Module = {
  presence: Presense;
  id: string;
  title: string;
  max: number;
  value: number;
};

const SaveDegree: React.FC<SaveDegreeProps> = () => {
  const { teacherType, currentRole } = useContext(HomeContext);
  const { logout } = useContext(AppContext);

  const { inputs, setForm, submit, updateInputs, loadingIndex } =
    useFormOptions({
      label: "SaveDegree" + teacherType,
      actionName: "ibtnSearch",
    });

  const [stage, setStage] = useState(0);

  const [student, setStudent] = useState("");
  const [module, setModule] = useState("");

  const [modules, setModules] = useState<Module[]>([
    {
      id: "sddsd",
      title: "hello world",
      max: 10,
      presence: Presense.absent,
      value: 2,
    },

    {
      id: "sddsdefdze",
      title: "hellzfeorld",
      max: 5,
      presence: Presense.absent,
      value: 3,
    },
  ]);

  useEffect(() => {
    const isSecondStage = loadingIndex == inputs.length - 1;
    if (isSecondStage) {
      fetchSkills();
      setTimeout(() => setStage(1), 700);
    }
  }, [loadingIndex]);


  useEffect(() => {
    Repository.instance
      .navigateTo({
        account: currentRole!,
        nav1: "الإختبارات",
        nav2: "ادخال الدرجات",
      })
      .then((r) => setForm(r.form))
      .catch(logout);
  }, []);


  async function fetchSkills() {
    // const skills = await submit();
  }

  const checkSave = async () => {};
  const back = () => setStage(Math.max(stage - 1, 0));

  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title="رصد درجاة الفصل" />

      <div className="mt-4 b flex-1 flex flex-col max-w-sm mx-auto w-full">
        <div className="flex-1  w-full px-4 bg-white  rounded-md shadow  py-4">
          <Transition
            className="flex-1 w-full grid md:grid-cols-2  gap-3"
            show={stage == 0}
          >
            {inputs.map((input, i) => (
              <div key={input.id + i}>
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
          </Transition>

          <Transition className={"flex-1"} show={stage == 1}>
            <h3 className="text-indigo-500 font-arabic text-center text-sm">
              {student}
            </h3>
            <h3 className="text-indigo-600 bg-indigo-50 py-1 font-arabic text-center text-md">
              {module}
            </h3>
            <div className="mt-2">
              {modules.map((m) => (
                <div className="border-b items-end border-b-indigo-500/20 py-2 px-2 space-x-2 flex flex-row-reverse">
                  <div className="">
                    <p className="text-sm text-right text-indigo-700">
                      {m.title}
                    </p>
                    <div className="flex items-center shadow-sm focus-within:border-indigo-500 border rounded-md border-gray-300 pr-2">
                      <input
                        type="number"
                        className=" bg-white -mr-1  text-right outline-none rounded-md w-20 text-lg text-indigo-900"
                      />
                      <p className="font-mono -mb-1 text-md text-slate-500">
                        / {m.max}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 h-8 justify-center">
                    <CheckBoxs
                      className="flex space-x-2"
                      onSelect={() => {}}
                      options={[
                        {
                          id: "dsd",
                          value: "حاضر",
                        },
                        {
                          id: "dsdsdd",
                          value: "غائب",
                        },
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex mt-4 flex-row-reverse  items-center justify-between">
              {/* todo bullet navigation */}

              <CustomButton loading={false} onClick={checkSave}>
                رصد
              </CustomButton>
              <CustomButton icon={false} secondary onClick={back}>
                رجوع
              </CustomButton>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default SaveDegree;
