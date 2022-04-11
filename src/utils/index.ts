import {
  BackgroundTask,
  BackgroundTaskType,
  HomeTab,
  TeacherType
} from "../models/home_model";

export const tabBarTitle = (tab: HomeTab, type: TeacherType) =>
  ({
    [HomeTab.saveAll]: "تحصيل الكل",
    [HomeTab.saveReport]:
      type == TeacherType.elementery ? "انشاء كشف درجات" : "تقرير جديد",
    [HomeTab.savedegree]: "رصد درجات الفصل",
    [HomeTab.savedReports]: "التقرارير",
    [HomeTab.home]: "الرئيسية",
    [HomeTab.logout]: "خروج",
    [HomeTab.saveCustom]: "رصد وحدة ومهارة",
    [HomeTab.studentsNotAccepted]: "رصد وحدة ومهارة",
    [HomeTab.editSkill]: "تعديل المهارت",
    [HomeTab.didntGet]: "لم يتقنو المهارت",
  }[tab]);

export const teacherTypeArabic = (type: TeacherType) => {
  if (type == TeacherType.kindergarten) return "الروضة";
  else if (type == TeacherType.primary) return "الابتدائية";
  else return "المتوسطة";
};

export function mergeCookies(...cookies: string[][]) {
  const items = cookies
    .filter((e) => e)
    .map((e) =>
      e
        .filter((e) => e)
        .map((c) => c.split(";"))
        .flat()
        .map((e) => e.trim())
    )
    .flat();

  const ob = items.reduce(
    (acc, v) => ({
      ...acc,
      [v.split("=")[0]]: v.split("=")[1],
    }),
    {} as { [key: string]: string }
  );

  return Object.entries(ob).reduce((acc, v) => {
    if (!v[1]) return acc;
    return [...acc, `${v[0]}=${v[1]}`];
  }, [] as string[]);
}

export function taskTitle(taskType: BackgroundTaskType) {
  if (taskType == BackgroundTaskType.saveAll) return "ةحصيل الكل";
  else if (taskType == BackgroundTaskType.saveCustom)
    return "ةحصيل وحدة ومهارة";
}

export function getPausedTab(tasks: BackgroundTask<any>[]) {
  return tasks
    .map((task) => {
      if (task.type == BackgroundTaskType.saveAll) return HomeTab.saveAll;
      else if (task.type == BackgroundTaskType.saveCustom)
        return HomeTab.saveCustom;
    })
    .filter(Boolean) as HomeTab[];
}

export async function wait(
  fc: () => Promise<any>,
  loading: (v: boolean) => any
) {
  loading(true);
  await fc();
  loading(false);
}




export const staticDegress = [
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl01",
          value: 1,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl02_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl02$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2368964090,
    studentName: "ابراهيم هشام محمد نيازي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl07",
          value: 8,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl03_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl03$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1176229522,
    studentName: "أحمد منصور مناور الجابري",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl04_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl04$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1165088483,
    studentName: "البراء بندر محمد العمري",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl05_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl05$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1171042490,
    studentName: "انس عبدالقادر بن محمد الشنقيطى",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl06",
          options: [
            {
              selected: false,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: true,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl06_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl06$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1164574079,
    studentName: "انس ماجد بن دليش الحربي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl07_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl07$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1165730878,
    studentName: "بدر عبدالعزيز صالح الجهني",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl04",
          value: 3,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl08_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl08$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2370936797,
    studentName: "حامد عبد الله - عبدالكريم",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl09_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl09$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1168734950,
    studentName: "خليل جميل محمود القازنلي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl10_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl10$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1167493160,
    studentName: "راكان مهند عبدالعزيز الجهني",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl11_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl11$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1166193308,
    studentName: "عبدالاله عبدالمجيد نماي العلوي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl12_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl12$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1164245415,
    studentName: "عبدالعزيز راجح سعد السحيمي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl13_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl13$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2365442942,
    studentName: "عبدالله سمير غانم حمود",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl14_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl14$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2420673689,
    studentName: "علي مروان عبدالله سليمان",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl15_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl15$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2355810348,
    studentName: "عمر احمد عبده مقبل",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl16_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl16$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1164612259,
    studentName: "عمر انس بن زكي خشيم",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl17_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl17$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1164374579,
    studentName: "عمر هشام حمزه قم قم جى",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl18_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl18$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1160637615,
    studentName: "فارس عبدالله هارون الهوساوي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl19_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl19$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1165027432,
    studentName: "قصي عبدالله عواض الجابري",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl20_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl20$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2328753997,
    studentName: "ماهر محمود حبيب الر حمن عبدالكريم",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl21_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl21$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2365278742,
    studentName: "محمد الفضل عبدالناصر عباس دبوره",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl22_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl22$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2361699503,
    studentName: "محمد راكان حسام محمد كريدي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl23_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl23$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1164759316,
    studentName: "محمد سلطان بن عقيل الحربي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl24_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl24$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2422231213,
    studentName: "محمد عبدالمنعم حسن محمد",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl25_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl25$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1163631755,
    studentName: "معاذ يوسف مصطفى مسعودي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl26_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl26$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2452550417,
    studentName: "معتز اشرف محمد العمراني",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl27_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl27$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2357416441,
    studentName: "معتز محمود عبدالملك ملك مالو",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl28_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl28$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 1167038791,
    studentName: "نواف عبداللطيف بن ملفي الحربي",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl29_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl29$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2372513339,
    studentName: "يزن جهاد احمد الفقيه",
    semester: 1,
  },
  {
    id: null,
    modules: [
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl01",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl01",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl03",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl03",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة نظري",
      },
      {
        input: {
          max: 5,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl04",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl04",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl06",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl06",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "اختبارات قصيرة شفهية",
      },
      {
        input: {
          max: 10,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl07",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl07",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl09",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl09",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "واجبات",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl10",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl10",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl12",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl12",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "المشاركة والتفاعل",
      },
      {
        input: {
          max: 20,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl13",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl13",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl15",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl15",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "لياقة بدنية",
      },
      {
        input: {
          max: 40,
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl16",
          value: 0,
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl16",
        },
        presence: {
          id: "ctl00_PlaceHolderMain_DynamicGrid_ctl30_ctl18",
          name: "ctl00$PlaceHolderMain$DynamicGrid$ctl30$ctl18",
          options: [
            {
              selected: true,
              text: "حاضر",
              value: "1",
            },
            {
              selected: false,
              text: "غائب",
              value: "2",
            },
            {
              selected: false,
              text: "غاش",
              value: "3",
            },
            {
              selected: false,
              text: "صفر",
              value: "4",
            },
          ],
          title: "",
        },
        title: "مهارات حركية أو رياضية",
      },
    ],
    studentID: 2341942106,
    studentName: "يعقوب محمد رسول - نعيم",
    semester: 1,
  },
];