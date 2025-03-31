import { api } from "../apis/helper";
import type { ApiDonationData, LoggedUserData } from "../types/common";

export const addDonationService = async (donationData: ApiDonationData) => {
  const url = "/donations/addDonation";
  const response = await api.post(url, donationData);
  return response;
};

export const fetchDonationService = async () => {
  const url = "/donations/fetchDonations";
  // TODO send it via token api
  const loggedUserData: LoggedUserData = JSON.parse(
    sessionStorage.getItem("loggedUserData") || "{}"
  );
  const response = await api.get(url, { params: loggedUserData });
  return response;
};
