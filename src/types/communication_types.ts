export type BouncingNavigation = {
  cookies: string[];
  from?: string;
  weirdData?: {[key:string]:string};
};

export interface NavigateTo {
  nav1: string;
  nav2: string;
  account: string;
}

export interface FormOptions {
  action: string;
  inputs: FormInput[];
  id: string;
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
  weirdData: {
    [key: string]: any;
  };
  inputs: FormInput[];
};

export type NavigateResponse = {
  redirected: string;
  cookies: string[];
  form: Form;
};
