import * as functions from "firebase-functions";
import Form, { FormInput } from "../../../../core/form";
import Redirect from "../../../../core/redirect";
import { IncrementalData } from "../../../../types";
import { Degrees, SaveDegreeForm } from "./utils";


interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  degrees: Degrees[];
}

export default functions
  .region("asia-south1")
  .https.onCall(async (data: NavigationData) => {
    const homePage = await Redirect.load(data);

    const form = new SaveDegreeForm(
      Form.fromJson({
        action: data.action,
        weirdData: data.weirdData,
        inputs: data.inputs,
        actionButtons: [],
      }).html
    );

    // const search = await form.save(data.degrees, homePage);
    // const response = SaveDegreeForm.updateFromSreachSubmission(search);

    return homePage.sendForm(form);
  });
