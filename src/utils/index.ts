import {
  BackgroundTask,
  BackgroundTaskType,
  HomeTab,
  TeacherType,
} from "../models/home_model";

export const tabBarTitle = (tab: HomeTab, type: TeacherType) =>
  ({
    [HomeTab.saveAll]: "رصد الكل",
    [HomeTab.saveReport]:
      type == TeacherType.elementery
        ? "انشاء كشف درجات"
        : type == TeacherType.primary
        ? "انشاء كشف درجات الفصل"
        : "تقرير جديد",
    [HomeTab.savedegree]: "رصد درجات الفصل",
    [HomeTab.savedReports]: " التقارير المحفوظة",
    [HomeTab.home]: "الرئيسية",
    [HomeTab.saveReportSkill]: "انشاء كشف المهارات الفصل",
    [HomeTab.logout]: "خروج",
    [HomeTab.saveCustom]:
      type == TeacherType.primary
        ? "رصد على مستوى مادة ومهارة"
        : "رصد وحدة ومهارة",
    [HomeTab.studentsNotAccepted]: "رصد وحدة ومهارة",
    [HomeTab.editSkill]:
      type == TeacherType.primary ? "تعديل المهارت الطالب" : "تعديل مهارات الطفل",
    [HomeTab.didntGet]:
      type == TeacherType.primary
        ? "طلاب لم يتقنوا المهارت"
        : "لم يتقنوا المهارت",
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
  if (taskType == BackgroundTaskType.saveAll) return "تحصيل الكل";
  else if (taskType == BackgroundTaskType.saveCustom)
    return "تحصيل وحدة ومهارة";
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

export function diffInMinutes(d1: Date, d2: Date) {
  const m1 = d1.getTime() / 1000 / 60;
  const m2 = d2.getTime() / 1000 / 60;

  return Math.floor(m1 - m2);
}
