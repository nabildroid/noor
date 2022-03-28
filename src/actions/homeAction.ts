import { HomeState, HomeActions } from "../models/home_model";

export default (state: HomeState, action: HomeActions): HomeState => {
  if (action.type == "setRole")
    return {
      ...state,
      currentRole: action.payload,
    };
  else if (action.type == "loading_on")
    return {
      ...state,
      loading: true,
    };
  else if (action.type == "setTeacher")
    return {
      ...state,
      teacher:action.payload,
      loading: false,
    };
  else if (action.type == "loading_off")
    return {
      ...state,
      loading: false,
    };
  else if (action.type == "setTab")
    return {
      ...state,
      tab: action.payload,
    };
  else return state;
};
