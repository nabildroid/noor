export type BouncingNavigation = {
  cookies: string[];
  from?: string;
};

export interface NavigateTo {
  nav1: string;
  nav2: string;
  account: string;
}

type FormInput = {
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

export type NavigateResponse = {
  redirected: string;
  cookies: string[];
  form: {
    action: string;
    weirdData: {
      [key: string]: any;
    };
    inputs: FormInput[];
  };
};
