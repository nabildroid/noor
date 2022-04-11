import newAccount from "./endpoints/background/newAccount";
// saveAll
import saveAll from "./endpoints/background/saveAll";
// edit skill
import skillSave from "./endpoints/callables/incremental/editSkill/save";
import skillSubmit from "./endpoints/callables/incremental/editSkill/submit";
// navigation
import formOption from "./endpoints/callables/incremental/formOptions";
import navigation from "./endpoints/callables/incremental/navigation";
import saveDegreeSubmit from "./endpoints/callables/incremental/saveDegree/submit";
// reports
import newSkillReport from "./endpoints/callables/incremental/saveReport/newSkillReport";
import postSignForm from "./endpoints/callables/postSignForm";
// login
import signForm from "./endpoints/callables/signForm";




export {
  signForm,
  postSignForm,
  newAccount,
  navigation,
  formOption,
  skillSave,
  skillSubmit,
  newSkillReport,
  saveDegreeSubmit,
  saveAll,
};
