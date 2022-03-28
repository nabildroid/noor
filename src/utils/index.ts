import { HomeTab } from "../models/home_model";

export const tabBarTitle = (tab: HomeTab) =>
  ({
    [HomeTab.saveAllDegrees]: "ةحصيل الكل",
    [HomeTab.saveOneDegree]: "ةحيل",
    [HomeTab.saveReport]: "ةقرير جديد",
    [HomeTab.savedReports]: "الةقرارير",
    [HomeTab.selectRole]: "اخةيار الحسياب",
  }[tab]);