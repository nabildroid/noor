import { Skill } from "../views/home/editSkill";

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
  id: string;
}

export interface FormSubmit {
  action: string;
  inputs: FormInput[];
  actionButton: FormInput;
  // type: // todo submit type!
}

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
