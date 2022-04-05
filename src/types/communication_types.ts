import { Skill } from "../views/home/editSkill";
import { Degrees } from "../views/home/saveDegree";

export type FormInput = {
  title: string;
  value?: string;
  id: string;
  options: {
    selected: boolean;
    text: string;
    value: string;
  }[];
  name?: string;
};

export type Form = {
  action: string;
  inputs: FormInput[];
  actionButtons: FormInput[];
};

export type BouncingNavigation = {
  cookies: string[];
  from?: string;
  weirdData?: { [key: string]: string };
};

export interface NavigateTo {
  nav1: string;
  nav2: string;
  account: string;
}

export interface FormOptions {
  action: string;
  inputs: FormInput[];
  actionButtons: FormInput[];
  name: string;
}

export interface FormSubmit {
  action: string;
  inputs: FormInput[];
  actionButton: FormInput;
  // type: // todo submit type!
}

export interface EditSkillSubmit {
  action: string;
  inputs: FormInput[];
  skills: {
    id: number;
    value: number;
  }[];
}

export interface ReportSubmit {
  action: string;
  inputs: FormInput[];
  isEmpty: boolean;
}

// ensuring the communication between the backend and frontend using typescript!
export type FormSubmitLookup =
  | {
      type: "formSubmit";
      payload: FormSubmit;
      response: NavigationResponse;
    }
  | {
      type: "skillSubmit";
      payload: FormSubmit;
      response: EditSkillNavigateResponse;
    }
  | {
      type: "saveDegreeSubmit";
      payload: FormSubmit;
      response: SaveDegreeNavigateResponse;
    }
  | {
      type: "skillReportSubmit";
      payload: ReportSubmit;
      response: NavigationResponse;
    };

export type NavigationResponse = {
  redirected: string;
  cookies: string[];
  from: string;
  weirdData: { [key: string]: string };
  payload: any;
};

export interface FormNavigateResponse extends NavigationResponse {
  payload: {
    form: Form;
  };
}

export interface EditSkillNavigateResponse extends NavigationResponse {
  payload: {
    form: Form;
    skillId: string;
    skills: Skill[];
  };
}
export interface SaveDegreeNavigateResponse extends NavigationResponse {
  payload: {
    form: Form;
    degress: Degrees[];
  };
}
