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
const failureRegisterUser = (error: Error) => ({
  type: UserTypes.FAILURE_CREATE_USER_DETAILS,
  error: error.message,
});

const loginUser = (loginDetails: LoginDetails) => ({
  type: UserTypes.LOGIN_USER,
  loginDetails,
});
const requestLoginUser = () => ({
  type: UserTypes.REQUEST_LOGIN_USER,
});
const successLoginUser = (successMessage: string) => ({
  type: UserTypes.SUCCESS_LOGIN_USER,
  successMessage,
});
const failureLoginUser = (error: Error) => ({
  type: UserTypes.FAILURE_LOGIN_USER,
  error: error.message,
});

const usersActions = {
  registerUser,
  requestRegisterUser,
  successRegisterUser,
  failureRegisterUser,
  loginUser,
  requestLoginUser,
  successLoginUser,
  failureLoginUser,
};

export default usersActions;
