import { UserTypes } from "../actions/actionTypes";

type userReducerTypes = {
  successMessage: string;
  error: string;
  type?: string;
  data: {
    userName: string;
    email: string;
  };
};

const initialReducer: userReducerTypes = {
  successMessage: "",
  error: "",
  data: {} as userReducerTypes["data"],
};

export const userReducer = (
  state = initialReducer,
  action: userReducerTypes
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
