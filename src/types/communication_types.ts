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
  weirdData: {
    [key: string]: any;
  };
  inputs: FormInput[];
  actionButtons: FormInput[];
};

export type NavigationResponse = {
  redirected: string;
  cookies: string[];
};

export interface FormNavigateResponse extends NavigationResponse {
  form: Form;
}
