import * as functions from "firebase-functions";
import Form, { FormInput } from "../../../../core/form";
import Redirect from "../../../../core/redirect";
import { IncrementalData } from "../../../../types";
import { SaveDegreeForm } from "./utils";


interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  actionButton: FormInput;
}

export default functions
  .region("asia-south1")
  .https.onCall(async (data: NavigationData) => {
    const homePage = await Redirect.load(data);

    data.actionButton = {
      name: "ctl00$PlaceHolderMain$btY21",
      value: "", // CHECK hard coded
      id: "",
      options: [],
      title: "ابحث",
    };

    const form = new SaveDegreeForm(
      Form.fromJson({
        action: data.action,
        weird: data.weirdData,
        inputs: data.inputs,
        actionButtons: [data.actionButton],
      }).html
    );

    const search = await form.submit(data.actionButton.name!, homePage);

    const response = SaveDegreeForm.updateFromSreachSubmission(search);
    return homePage.sendForm(response.form, {
      degrees: response.degrees,
    });
  });
