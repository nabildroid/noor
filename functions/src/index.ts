import postSignForm from "./endpoints/callables/postSignForm";
import signForm from "./endpoints/callables/signForm";
import newAccount from "./endpoints/background/newAccount";
import navigation from "./endpoints/callables/incremental/navigation";
import formOption from "./endpoints/callables/incremental/formOptions";
import formSubmit from "./endpoints/callables/incremental/formSubmit";

import skillSubmit from "./endpoints/callables/incremental/editSkill/submit";
import skillSave from "./endpoints/callables/incremental/editSkill/save";

import newSkillReport from "./endpoints/callables/incremental/saveReport/newSkillReport";

import saveDegreeSubmit from "./endpoints/callables/incremental/saveDegree/submit";
import saveAll from "./endpoints/background/saveAll/save";

export {
  signForm,
  postSignForm,
  newAccount,
  navigation,
  formOption,
  formSubmit,
  skillSave,
  skillSubmit,
  newSkillReport,
  saveDegreeSubmit,
  saveAll,
};