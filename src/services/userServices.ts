import axios from "axios";
import type { LoginDetails, UserData } from "../types/common";

const api = axios.create({ baseURL: "http://localhost:3002" });

export const fetchUserDataService = async (
  userName?: string
): Promise<object> => {
  const url = `/users/fetch-details/${userName}`;
  const response = await api.get(url);
  return response;
};

export const updateUserPasswordService = async ({
  userMail,
  password,
}: LoginDetails) => {
  const url = "/users/update-password";
  const response = await api.put(url, { userMail, password });
  return response;
};

export const createUserService = async (userData: UserData) => {
  const {
    userName,
    password,
    mobile,
    location,
    email,
    reciever,
    registeredId,
  } = userData as UserData;
  const url = "/users/create-user";
  const response = await api.post(url, {
    userName,
    password,
    mobile,
    location,
    email,
    reciever,
    registeredId,
  });
  return response;
};

export const loginUserService = async ({
  userMail,
  password,
}: LoginDetails) => {
  const url = `/users/login-user`;
  const response = await api.post(url, { userMail, password });
  return response;
};
