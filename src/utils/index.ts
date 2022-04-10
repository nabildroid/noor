import {
  BackgroundTask,
  BackgroundTaskType,
  HomeTab,
  TeacherType
} from "../models/home_model";

export const tabBarTitle = (tab: HomeTab) =>
  ({
    [HomeTab.saveAll]: "تحصيل الكل",
    [HomeTab.saveReport]: "تقرير جديد",
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
