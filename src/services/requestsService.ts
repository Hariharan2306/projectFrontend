import { api } from "../apis/helper";
import type {
  DateRangeType,
  LoggedUserData,
  RequestingData,
} from "../types/common";

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

export const fetchRequestDonationService = async (
  search?: string,
  page?: number,
  pageSize?: number,
  dateRange?: DateRangeType,
  quantity?: number[]
) => {
  const url = "/requests/";
  const userData = JSON.parse(sessionStorage.getItem("loggedUserData") || "{}");
  const response = api.get(url, {
    params: {
      ...userData,
      search,
      page,
      pageSize,
      dateRange: JSON.stringify(dateRange),
      quantity: JSON.stringify(quantity),
    },
  });
  return response;
};

export const withdrawDonationService = async (requestId: number) => {
  const url = `/requests/withdraw${requestId}`;
  const response = api.delete(url);
  return response;
};
