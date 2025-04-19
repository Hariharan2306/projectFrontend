import { DonationTypes } from "./actionTypes";
import type {
  ApiDonationData,
  DateRangeType,
  DonationData,
} from "../types/common";

const addDonation = (donationData: ApiDonationData) => ({
  type: DonationTypes.ADD_DONATION,
  donationData,
});
const requestAddDonation = () => ({ type: DonationTypes.REQUEST_ADD_DONATION });
const successAddDonation = (successMessage: string) => ({
  type: DonationTypes.SUCCESS_ADD_DONATION,
  successMessage,
});
const failureAddDonation = (errorMessage: string) => ({
  type: DonationTypes.FAILURE_ADD_DONATION,
  errorMessage,
});

const fetchDonationData = (
  search?: string,
  page?: number,
  pageSize?: number,
  dateRange?: DateRangeType,
  quantity?: number[]
) => ({
  type: DonationTypes.FETCH_DONATION_DATA,
  search,
  page,
  pageSize,
  dateRange,
  quantity,
});
const requestFetchDonationData = () => ({
  type: DonationTypes.REQUEST_FETCH_DONATION_DATA,
});
const successFetchDonationData = (
  donationData: DonationData["row"],
  donationCount: number,
  successMessage: string
) => ({
  type: DonationTypes.SUCCESS_FETCH_DONATION_DATA,
  donationData,
  donationCount,
  successMessage,
});
const failureFetchDonationData = (errorMessage: string) => ({
  type: DonationTypes.FAILURE_FETCH_DONATION_DATA,
  errorMessage,
});

const resetMessage = () => ({ type: DonationTypes.RESET_MESSAGE });

const donationActions = {
  addDonation,
  requestAddDonation,
  successAddDonation,
  failureAddDonation,
  fetchDonationData,
  requestFetchDonationData,
  successFetchDonationData,
  failureFetchDonationData,
  resetMessage,
};
export default donationActions;
