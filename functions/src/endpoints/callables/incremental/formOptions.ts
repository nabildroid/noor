import * as functions from "firebase-functions";

import { IncrementalData } from "../../../types";
import Redirect from "../../../redirect";
import Form, { FormInput } from "../../../form";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  id: string;
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
  });

  const selected = data.inputs.find((e) => e.id == data.id)!;
  const selectedValue = selected.options.find((e) => e.selected)!;

  await form.fetchFromOption(
    { id: selected.id, name: selected.name!, value: selectedValue.value },
    [],
    homePage
  );

  // todo include the cookies and redirected;
  return { form: form.toJson() };
});
