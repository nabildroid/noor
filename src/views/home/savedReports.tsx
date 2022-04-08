import { Listbox, Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import CheckTable from "../../components/home/checkTable";
import RadioList, { RadioListItem } from "../../components/home/radioList";
import CustomButton from "../../components/home/customButton";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import useFormOptions from "../../hooks/useFormOptions";
import rates, { KinderRating } from "../../models/rating";
import Repository from "../../repository";
import { teacherTypeArabic } from "../../utils";
import CheckBoxs from "../../components/home/checkboxs";
import { FormInput } from "../../types/communication_types";
import Noti from "../../components/home/noti";
import WhiteTable from "../../components/home/checkTable";
import { Report, TeacherType } from "../../models/home_model";
import DB from "../../repository/db";

interface SavedReportsProps {}

const inputs: FormInput[] = [
  {
    id: "dsd",
    title: "الصف",
    options: [
      {
        selected: true,
        text: "الكل",
        value: "dsdsd",
      },
    ],
  },
  {
    id: "dsd11",
    title: "الصف",
    options: [
      {
        selected: true,
        text: "الكل",
        value: "dsdsd",
      },
    ],
  },
];

const SavedReports: React.FC<SavedReportsProps> = () => {
  const { user } = useContext(AppContext);
  const { teacherType } = useContext(HomeContext);
  const [reports, setReports] = useState<Report[]>([]);
  const [visibleReports, setVisibleReports] = useState<
    {
      id: string;
      childs: string[];
    }[]
  >([]);
  const [selected, onSelected] = useState<string[]>([]);

  const tableHead =
    teacherType == TeacherType.kindergarten ? ["الموسةوى", "الوحدة", ""] : [];

  const [selection, setSelection] = useState<
    {
      title: string;
      options: FormInput["options"];
      id: string;
    }[]
  >([]);

  useEffect(() => {
    if (!reports.length) return;
    const navIds = ["ddlClass", "ddlUnit"];
    const navs = [] as FormInput["options"][];

    reports.flat().forEach(({ params }) => {
      Object.entries(params).forEach(([k, v]) => {
        navIds.forEach((id, i) => {
          if (k.includes(id)) {
            navs[i] = [...(navs[i] ?? []), v];
          }
        });
      });
    });

    const all = {
      value: "",
      text: "الكل",
      selected: true,
    };
    setSelection(
      navs.map((n, i) => ({
        id: navIds[i],
        title: tableHead[i],
        options: [{ ...all }, ...n.filter((e) => e.value != "-99")],
      }))
    );
  }, [reports]);

  useEffect(() => {
    const visible = reports.filter(({ params }) => {
      return selection.every((s) => {
        const active = s.options.find((e) => e.selected)!;
        return Object.entries(params).some(([k, v]) => {
          return (
            k.includes(s.id) && (active.value === "" || active.value == v.value)
          );
        });
      });
    });
    console.log(visible);
    setVisibleReports(
      visible.map(({ id, params,isEmpty }) => {
        const childs = Object.entries(params)
          .filter(([k]) => {
            return selection.some((s) => k.includes(s.id));
          })
          .filter(([_, v]) => v.text != "الكل")
          .map(([_, v]) => v.text);
          
        return { id, childs:[...childs,isEmpty?"فارغ":"مرصود"]};
      })
    );
  }, [selection]);

  const select = (navId: string, value: string) => {
    setSelection(
      selection.map((s) => {
        if (s.id == navId) {
          return {
            ...s,
            options: s.options.map((e) => ({
              ...e,
              selected: e.value == value,
            })),
          };
        }
        return s;
      })
    );
  };

  useEffect(() => {
    DB.instance.getReports(user!.uid).then(setReports);
  }, []);

  function remove() {
    selected.forEach((id) => {
      DB.instance.deleteReport(id);
      setReports((r) => r.filter((a) => a.id != id));
    });
  }

  return (
    <div className="flex flex-1 h-full flex-col">
      <PageTitle title="التقارير المحفوظة" />

      <div
        className={`mt-4 b flex-1 flex flex-col max-w-sm md:max-w-xl mx-auto w-full`}
      >
        <div className="flex-1 w-full px-4 bg-white  rounded-md shadow py-4">
          <div className="mx-auto max-w-sm w-full">
            {selection.map((input, i) => (
              <div key={i}>
                <SelectBox
                  loading={false}
                  select={(e) => select(input.id, e)}
                  label={input.title}
                  options={input.options.map((e) => ({
                    id: e.value,
                    name: e.text,
                    selected: e.selected,
                  }))}
                />
              </div>
            ))}
          </div>

          <CheckTable
            head={tableHead}
            action="ةحميل"
            onAction={console.log}
            onSelecte={onSelected}
            items={visibleReports}
          />

          <Transition show={!!selected.length}>
            <div className="flex space-x-2 justify-center mt-4">
              <CustomButton icon={false} secondary onClick={remove}>
                حدف
              </CustomButton>

              <CustomButton onClick={() => {}}>ةحميل</CustomButton>
              <CustomButton icon={false} onClick={() => {}}>
                مشارك
              </CustomButton>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default SavedReports;
