import {initializeApp} from "firebase-admin";

const app = initializeApp();

export const db = app.firestore();
export const auth = app.auth();


export const LOGIN_ENDPOINT = "https://noor.moe.gov.sa/Noor/login.aspx";

import postSignForm from "./endpoints/callables/postSignForm";
import signForm from "./endpoints/callables/signForm";

export { signForm, postSignForm };

export enum callables {
  signForm = "signForm",
  postSignForm = "postSignForm",
}
