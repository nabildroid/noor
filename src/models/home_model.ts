export enum TeacherType {
  kindergarten,
  elementery,
  primary,
}

export type Teacher = {
  name: string;
  id: string;
  try: number;
  isPremium: boolean;
  role: string[];
  currentRole: string;
};

export enum HomeTab {
  selectRole = "/",
  save = "save",
  saveAll = "saveall",
  savedegree = "savedegree",
  editSkill = "editSkill",
  didntGet = "didntget",
  studentsNotAccepted = "notaccepted",
  savedReports = "reports",
  saveReport = "newreport",
  saveCustom = "savecustom",
}

export type HomeActions =
  | {
      type: "setRole";
      payload: string;
    }
  | {
      type: "setTab";
      payload: HomeTab;
    }
  | {
      type: "setTeacher";
      payload: Teacher;
    }
  | {
      type: "setTabs";
      payload: HomeTab[];
    }
  | {
      type: "setTeacherType";
      payload: TeacherType;
    }
  | {
      type: "loading_off";
    }
  | {
      type: "loading_on";
    };

export type HomeState = {
  currentRole?: string;
  teacher?: Teacher;
  teacherType: TeacherType;
  loading: boolean;
  tab: HomeTab;
  tabs: HomeTab[];
};

export const HomeStateInit: HomeState = {
  tab: HomeTab.selectRole,
  loading: false,
  currentRole: "المدرس الاول",

  teacherType: TeacherType.elementery,
  tabs: [],
};

export interface IHomeProvider extends HomeState {
  selectTab(tab: HomeTab): void;
  selectRole(role: string): void;
}

