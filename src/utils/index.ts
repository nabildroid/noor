import { HomeTab, TeacherType } from "../models/home_model";

export const tabBarTitle = (tab: HomeTab) =>
  ({
    [HomeTab.saveAllDegrees]: "ةحصيل الكل",
    [HomeTab.saveOneDegree]: "ةحيل",
    [HomeTab.saveReport]: "ةقرير جديد",
    [HomeTab.savedReports]: "الةقرارير",
    [HomeTab.selectRole]: "اخةيار الحسياب",
    [HomeTab.saveCustom]: "رصد وحدة ومهارة",
    [HomeTab.studentsNotAccepted]: "رصد وحدة ومهارة",
    [HomeTab.editSkill]: "رصد وحدة ومهارة",
    [HomeTab.notSaved]: "رصد وحدة ومهارة",
  }[tab]);


export const teacherTypeArabic = (type:TeacherType)=>{
  if(type == TeacherType.kindergarten)
  return "الروضة"
  else if(type == TeacherType.primary)
    return "الابةدائية"
  else return "المةوسطة"
}





