import * as admin  from "firebase-admin";

const app = admin.initializeApp();

export const db = app.firestore();
export const auth = app.auth();

export const LOGIN_ENDPOINT = "https://noor.moe.gov.sa/Noor/login.aspx";
