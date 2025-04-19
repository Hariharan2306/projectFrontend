import { api } from "../apis/helper";
import type {
  ApiDonationData,
  DateRangeType,
  LoggedUserData,
} from "../types/common";

export const addDonationService = async (donationData: ApiDonationData) => {
  const url = "/donations/addDonation";
  const loggedUserData: LoggedUserData = JSON.parse(
    sessionStorage.getItem("loggedUserData") || "{}"
  );
  const response = await api.post(url, { ...donationData, ...loggedUserData });
  return response;
};

export const fetchDonationService = async (
  search?: string,
  page?: number,
  pageSize?: number,
  dateRange?: DateRangeType,
  quantity?: number[]
) => {
  const url = "/donations/fetchDonations";
  const response = await api.get(url, {
    params: {
      search,
      page,
      pageSize,
      dateRange: JSON.stringify(dateRange),
      quantity: JSON.stringify(quantity),
    },
  });
  return response;
};
