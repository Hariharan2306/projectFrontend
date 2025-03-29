import { api } from "../apis/helper";
import type { LoginDetails, UserData } from "../types/common";

export const updateUserPasswordService = async (loginDetails: LoginDetails) => {
  const url = "/users/update-password";
  const response = await api.put(url, loginDetails);
  return response;
};

export const createUserService = async (userData: UserData) => {
  const url = "/users/create-user";
  const response = await api.post(url, userData);
  return response;
};

export const loginUserService = async (loginDetails: LoginDetails) => {
  const url = `/users/login-user`;
  const response = await api.post(url, loginDetails);
  return response;
};
