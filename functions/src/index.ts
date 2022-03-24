export const LOGIN_ENDPOINT = "https://noor.moe.gov.sa/Noor/login.aspx";

import postSignForm from "./endpoints/callables/postSignForm";
import signForm from "./endpoints/callables/signForm";

export { signForm, postSignForm };

export enum callables {
  signForm = "signForm",
  postSignForm = "postSignForm",
}
