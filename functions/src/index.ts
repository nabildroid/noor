import newAccount from "./endpoints/background/newAccount";
import saveAll from "./endpoints/background/saveAll";
import skillSave from "./endpoints/callables/incremental/editSkill/save";
import skillSubmit from "./endpoints/callables/incremental/editSkill/submit";
import formOption from "./endpoints/callables/incremental/formOptions";
import navigation from "./endpoints/callables/incremental/navigation";
import degreeSave from "./endpoints/callables/incremental/saveDegree/save";
import degreeSubmit from "./endpoints/callables/incremental/saveDegree/submit";
import skillReport from "./endpoints/callables/incremental/saveReport/skillReport";
import postSignForm from "./endpoints/callables/postSignForm";
import signForm from "./endpoints/callables/signForm";

export {
  signForm,
  postSignForm,
  newAccount,
  navigation,
  formOption,
  skillSave,
  skillSubmit,
  skillReport,
  degreeSubmit,
  degreeSave,
  saveAll,
};
