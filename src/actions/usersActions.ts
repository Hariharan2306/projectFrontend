import type { LoginDetails, UserData } from "../types/common";
import { UserTypes } from "./actionTypes";

const registerUser = (userData: UserData) => ({
  type: UserTypes.CREATE_USER_DETAILS,
  userData,
});
const requestRegisterUser = () => ({
  type: UserTypes.REQUEST_CREATE_USER_DETAILS,
});
const successRegisterUser = (successMessage: string) => ({
  type: UserTypes.SUCCESS_CREATE_USER_DETAILS,
  successMessage,
});
const failureRegisterUser = (error: string) => ({
  type: UserTypes.FAILURE_CREATE_USER_DETAILS,
  error,
});

const loginUser = (loginDetails: LoginDetails) => ({
  type: UserTypes.LOGIN_USER,
  loginDetails,
});
const requestLoginUser = () => ({
  type: UserTypes.REQUEST_LOGIN_USER,
});
const successLoginUser = ({ message = "", data = {} }) => ({
  type: UserTypes.SUCCESS_LOGIN_USER,
  successMessage: message,
  data,
});
const failureLoginUser = (error: string) => ({
  type: UserTypes.FAILURE_LOGIN_USER,
  error,
});

const resetMessage = () => ({ type: UserTypes.RESET_MESSAGE });

const usersActions = {
  registerUser,
  requestRegisterUser,
  successRegisterUser,
  failureRegisterUser,
  loginUser,
  requestLoginUser,
  successLoginUser,
  failureLoginUser,
  resetMessage,
};

export default usersActions;
