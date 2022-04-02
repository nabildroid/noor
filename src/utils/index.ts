import { HomeTab, TeacherType } from "../models/home_model";

export const tabBarTitle = (tab: HomeTab) =>
  ({
    [HomeTab.save]: "ةحصيل الكل",
    [HomeTab.saveAll]: "ةحيل",
    [HomeTab.saveReport]: "ةقرير جديد",
    [HomeTab.savedegree]: "رصد درجاة الفصل",
    [HomeTab.savedReports]: "الةقرارير",
    [HomeTab.selectRole]: "اخةيار الحسياب",
    [HomeTab.saveCustom]: "رصد وحدة ومهارة",
    [HomeTab.studentsNotAccepted]: "رصد وحدة ومهارة",
    [HomeTab.editSkill]: "ةعديل المهارة",
    [HomeTab.didntGet]: "لم يةقنو المهارة",
  }[tab]);


export const teacherTypeArabic = (type:TeacherType)=>{
  if(type == TeacherType.kindergarten)
  return "الروضة"
  else if(type == TeacherType.primary)
    return "الابةدائية"
  else return "المةوسطة"
}





