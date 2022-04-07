import postSignForm from "./endpoints/callables/postSignForm";
import signForm from "./endpoints/callables/signForm";
import newAccount from "./background/newAccount";
import navigation from "./endpoints/callables/incremental/navigation";
import formOption from "./endpoints/callables/incremental/formOptions";
import formSubmit from "./endpoints/callables/incremental/formSubmit";

import skillSubmit from "./endpoints/callables/incremental/editSkill/submit";
import skillSave from "./endpoints/callables/incremental/editSkill/save";

import skillReportSubmit from "./endpoints/callables/incremental/saveReport/saveSkill";

import saveDegreeSubmit from "./endpoints/callables/incremental/saveDegree/submit";
import saveAll from "./background/saveAll/save";

export {
  signForm,
  postSignForm,
  newAccount,
  navigation,
  formOption,
  formSubmit,
  skillSave,
  skillSubmit,
  skillReportSubmit,
  saveDegreeSubmit,
  saveAll,
};