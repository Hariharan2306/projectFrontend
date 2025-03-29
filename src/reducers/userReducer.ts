import { UserTypes } from "../actions/actionTypes";
import type { CommonReducerType } from "../types/common";

type userReducerTypes = {
  data: {
    userName: string;
    email: string;
    // pincode
    // TODO: handle it in different format
    location: string;
  };
};

const initialReducer: userReducerTypes & CommonReducerType = {
  successMessage: "",
  error: "",
  type: "",
  data: {} as userReducerTypes["data"],
};

export const userReducer = (
  state = initialReducer,
  action: userReducerTypes & CommonReducerType
) => {
  switch (action.type) {
    case UserTypes.SUCCESS_CREATE_USER_DETAILS:
    case UserTypes.SUCCESS_LOGIN_USER:
      return {
        ...state,
        successMessage: action.successMessage,
        userData: action.data,
      };
    case UserTypes.FAILURE_CREATE_USER_DETAILS:
    case UserTypes.FAILURE_LOGIN_USER:
      return { ...state, error: action.error };
    case UserTypes.RESET_MESSAGE:
      return { ...state, successMessage: "", error: "" };
    default:
      return state;
  }
};
