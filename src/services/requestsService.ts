import { api } from "../apis/helper";
import type { LoggedUserData, RequestingData } from "../types/common";

export const requestDonationService = async (
  requestingData: RequestingData
) => {
  const url = "/requests/requestDonation";
  const { userName, email }: LoggedUserData = JSON.parse(
    sessionStorage.getItem("loggedUserData") || "{}"
  );
  const response = api.post(url, {
    ...requestingData,
    requestedBy: userName,
    requesterMail: email,
  });
  return response;
};

export const fetchRequestDonationService = async () => {
  const url = "/requests/";
  const response = api.get(url, { params: {} });
  return response;
};

export const withdrawDonationService = async (requestId: number) => {
  const url = `/requests/withdraw${requestId}`;
  const response = api.delete(url);
  return response;
};
