export type Teacher = {
  name: string;
  id: string;
  try: number;
  isPremium: boolean;
  role: string[];
  currentRole: string;
};

export enum HomeTab {
  selectRole = "select",
  saveOneDegree = "save",
  saveAllDegrees = "saveall",
  savedReports = "reports",
  saveReport = "newreport",
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
      type: "loading_off";
    }
  | {
      type: "loading_on";
    };

export type HomeState = {
  currentRole?: string;
  teacher?: Teacher;
  loading: boolean;
  tab: HomeTab;
};

export const HomeStateInit: HomeState = {
  tab: HomeTab.selectRole,
  loading: false,
  currentRole:"المدرس الاول",
  teacher:{
    currentRole:"المدرس الاول",
    id:"dsdsd",
    isPremium:false,
    name:"السيد العقريب نبيل",
    role:["مدرس ابداسبي","المشندي السابعد قبس المسان"],
    try:1525555
  }
};

export interface IHomeProvider extends HomeState {
  selectTab(tab: HomeTab): void;
  selectRole(role: string): void;
}
