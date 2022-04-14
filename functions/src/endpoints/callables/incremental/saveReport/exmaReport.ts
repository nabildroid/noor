import * as functions from "firebase-functions";

import { IncrementalData } from "../../../../types";
import { FormInput } from "../../../../core/form";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  isEmpty: boolean;
}

export default functions.region("asia-south1").https.onCall(async (data: NavigationData) => {});