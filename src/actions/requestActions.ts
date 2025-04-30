import { DonationRequestTypes } from "./actionTypes";
import type { DonationData, RequestingData } from "../types/common";

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

const fetchDonationRequests = () => ({
  type: DonationRequestTypes.FETCH_DONATION_REQUESTS,
});
const requestFetchDonationRequests = () => ({
  type: DonationRequestTypes.REQUEST_FETCH_DONATION_REQUESTS,
});
const successFetchDonationRequests = ({
  successMessage,
  donationRequests,
}: {
  successMessage: string;
  donationRequests: DonationData["row"];
}) => ({
  type: DonationRequestTypes.SUCCESS_FETCH_DONATION_REQUESTS,
  successMessage,
  donationRequests,
});
const failureFetchDonationRequests = (errorMessage: string) => ({
  type: DonationRequestTypes.FAILURE_FETCH_DONATION_REQUESTS,
  errorMessage,
});

const withdrawDonationRequest = (requestId: number) => ({
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
