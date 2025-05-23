import { api } from "../apis/helper";
import type { DateRangeType, LoggedUserData } from "../types/common";

export const fetchApprovalService = async (
  search?: string,
  page?: number,
  pageSize?: number,
  dateRange?: DateRangeType,
  quantity?: number[]
) => {
  const userData: LoggedUserData = JSON.parse(
    sessionStorage.getItem("loggedUserData") || "{}"
  );
  const url = "/approvals/";
  const result = api.get(url, {
    params: {
      ...userData,
      search,
      page,
      pageSize,
      dateRange: JSON.stringify(dateRange),
      quantity: JSON.stringify(quantity),
    },
  });
  return result;
};

export const fetchRequesterDetailsService = (reqId: string) => {
  const url = "/approvals/requester-details";
  const result = api.get(url, { params: { reqId } });
  return result;
};

export const approveDonationRequestsService = (
  reqId: string,
  isApproval: boolean
) => {
  const url = "/approvals/approve";
  const result = api.put(url, { reqId, isApproval });
  return result;
};
