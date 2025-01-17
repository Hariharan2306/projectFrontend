import { UserTypes } from "../actions/actionTypes";

type userReducerTypes = {
  successMessage: string;
  error: string;
  type?: string;
};

const initialReducer: userReducerTypes = { successMessage: "", error: "" };

export const userReducer = (
  state = initialReducer,
  action: userReducerTypes
) => {
  switch (action.type) {
    case UserTypes.SUCCESS_CREATE_USER_DETAILS:
    case UserTypes.SUCCESS_LOGIN_USER:
      return { ...state, successMessage: action.successMessage };
    case UserTypes.FAILURE_CREATE_USER_DETAILS:
    case UserTypes.FAILURE_LOGIN_USER:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
