import { HomeTab, TeacherType } from "../models/home_model";

export const tabBarTitle = (tab: HomeTab) =>
  ({
    [HomeTab.saveAll]: "تحصيل الكل",
    [HomeTab.saveReport]: "تقرير جديد",
    [HomeTab.savedegree]: "رصد درجات الفصل",
    [HomeTab.savedReports]: "التقرارير",
    [HomeTab.selectRole]: "اختيار الحسياب",
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
