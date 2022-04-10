import { Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/home/pageTitle";
import CheckTable from "../../components/home/checkTable";
import CustomButton from "../../components/home/customButton";
import SelectBox from "../../components/home/selectBox";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";
import { FormInput } from "../../types/communication_types";
import { Report, TeacherType } from "../../models/home_model";
import DB from "../../repository/db";
import Storage from "../../repository/storage";

interface SavedReportsProps {}

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
    teacherType == TeacherType.kindergarten ? ["الموستوى", "الوحدة", ""] : [];

  const [selection, setSelection] = useState<
    {
      title: string;
      options: FormInput["options"];
      id: string;
    }[]
  >([]);

  useEffect(() => createSelectionBoxes(), [reports]);
  function createSelectionBoxes() {
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
  }

  useEffect(() => createVisibleReports(), [selection]);
  function createVisibleReports() {
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

    setVisibleReports(
      visible.map(({ id, params, isEmpty }) => {
        const childs = Object.entries(params)
          .filter(([k]) => {
            return selection.some((s) => k.includes(s.id));
          })
          .filter(([_, v]) => v.text != "الكل")
          .map(([_, v]) => v.text);

        return { id, childs: [...childs, isEmpty ? "فارغ" : "مرصود"] };
      })
    );
  }

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
      setReports(reports.filter((a) => a.id != id));
    });
  }

  async function download(id?: string) {
    const ids = id ? [id] : selected;
    const paths = reports
      .filter((i) => ids.includes(i.id))
      .map((e) => e.files.pdf);
    try {
      const links = await Promise.all(
        paths.map(Storage.instance.getDownloadURL)
      );
      links.forEach((l) => window.open(l));
    } catch (e) {
      console.error("unable to get the urls");
    }
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
            onAction={download}
            onSelecte={onSelected}
            items={visibleReports}
          />

          <Transition show={!!selected.length}>
            <div className="flex space-x-2 justify-center mt-4">
              <CustomButton icon={false} secondary onClick={remove}>
                حدف
              </CustomButton>

              <CustomButton onClick={download}>ةحميل</CustomButton>
              {/* <CustomButton icon={false} onClick={() => {}}>
                مشارك
              </CustomButton> */}
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default SavedReports;
