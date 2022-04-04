import * as functions from "firebase-functions";

import { IncrementalData } from "../../../types";
import Redirect from "../../../core/redirect";
import Form, { FormInput } from "../../../core/form";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  actionButtons: FormInput[];
  name: string;
}

export default functions.https.onCall(async (data: NavigationData, context) => {
  console.log(data);
  const homePage = await Redirect.load({
    cookies: data.cookies,
    weirdData: data.weirdData,
    from:
      data.from ??
      "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
  });

  const form = Form.fromJson({
    action: data.action,
    weird: data.weirdData,
    inputs: data.inputs,
    actionButtons: data.actionButtons,
  });

  const selected = data.inputs.find((e) => e.name == data.name)!;
  const selectedValue = selected.options.find((e) => e.selected)!;

  await form.fetchFromOption(
    { id: selected.id, name: selected.name!, value: selectedValue.value },
    [],
    homePage
  );

  // todo include the cookies and redirected;
  return homePage.sendForm(form);
});
