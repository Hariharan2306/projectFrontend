import { DonationRequestTypes } from "./actionTypes";
import type {
  DateRangeType,
  AllRequestData,
  RequestingData,
} from "../types/common";

const createDonationRequest = (requestingData: RequestingData) => ({
  type: DonationRequestTypes.CREATE_DONATION_REQUESTS,
  requestingData,
});
const requestCreateDonationRequest = () => ({
  type: DonationRequestTypes.REQUEST_CREATE_DONATION_REQUESTS,
});
const successCreateDonationRequest = (successMessage: string) => ({
  type: DonationRequestTypes.SUCCESS_CREATE_DONATION_REQUESTS,
  successMessage,
});
const failureCreateDonationRequest = (errorMessage: string) => ({
  type: DonationRequestTypes.FAILURE_CREATE_DONATION_REQUESTS,
  errorMessage,
});

const fetchDonationRequests = (
  search?: string,
  page?: number,
  pageSize?: number,
  dateRange?: DateRangeType,
  quantity?: number[]
) => ({
  type: DonationRequestTypes.FETCH_DONATION_REQUESTS,
  search,
  page,
  pageSize,
  dateRange,
  quantity,
});
const requestFetchDonationRequests = () => ({
  type: DonationRequestTypes.REQUEST_FETCH_DONATION_REQUESTS,
});
const successFetchDonationRequests = (
  successMessage: string,
  requests: AllRequestData,
  requestsCount: number
) => ({
  type: DonationRequestTypes.SUCCESS_FETCH_DONATION_REQUESTS,
  successMessage,
  requests,
  requestsCount,
});
const failureFetchDonationRequests = (errorMessage: string) => ({
  type: DonationRequestTypes.FAILURE_FETCH_DONATION_REQUESTS,
  errorMessage,
});

const withdrawDonationRequest = (requestId: string) => ({
  type: DonationRequestTypes.WITHDRAW_DONATION_REQUESTS,
  requestId,
});
const requestWithdrawDonationRequest = () => ({
  type: DonationRequestTypes.REQUEST_WITHDRAW_DONATION_REQUESTS,
});
const successWithdrawDonationRequest = (successMessage: string) => ({
  type: DonationRequestTypes.SUCCESS_WITHDRAW_DONATION_REQUESTS,
  successMessage,
});
const failureWithdrawDonationRequest = (errorMessage: string) => ({
  type: DonationRequestTypes.FAILURE_WITHDRAW_DONATION_REQUESTS,
  errorMessage,
});
const resetMessage = () => ({ type: DonationRequestTypes.RESET_MESSAGE });

const requestActions = {
  createDonationRequest,
  requestCreateDonationRequest,
  successCreateDonationRequest,
  failureCreateDonationRequest,
  fetchDonationRequests,
  requestFetchDonationRequests,
  successFetchDonationRequests,
  failureFetchDonationRequests,
  withdrawDonationRequest,
  requestWithdrawDonationRequest,
  successWithdrawDonationRequest,
  failureWithdrawDonationRequest,
  resetMessage,
};
export default requestActions;
