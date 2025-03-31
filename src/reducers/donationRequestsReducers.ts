import get from "lodash/get";
import { DonationRequestTypes } from "../actions/actionTypes";
import type { AllRequestData, CommonReducerType } from "../types/common";

type DonationRequestReducerType = {
  donationRequestData: AllRequestData[];
};

const initialReducer: DonationRequestReducerType & CommonReducerType = {
  successMessage: "",
  errorMessage: "",
  type: "",
  donationRequestData: [] as AllRequestData[],
};

export const donationRequestReducer = (
  state = initialReducer,
  action: DonationRequestReducerType & CommonReducerType
) => {
  switch (action.type) {
    case DonationRequestTypes.FAILURE_CREATE_DONATION_REQUESTS:
    case DonationRequestTypes.FAILURE_FETCH_DONATION_REQUESTS:
    case DonationRequestTypes.FAILURE_WITHDRAW_DONATION_REQUESTS:
      return {
        ...state,
        errorMessage: get(action, "errorMessage", action.error) || "",
      };
    case DonationRequestTypes.SUCCESS_CREATE_DONATION_REQUESTS:
    case DonationRequestTypes.SUCCESS_FETCH_DONATION_REQUESTS:
    case DonationRequestTypes.SUCCESS_WITHDRAW_DONATION_REQUESTS:
      return {
        ...state,
        successMessage: action.successMessage,
        donationRequestData: action.donationRequestData,
      };
    case DonationRequestTypes.RESET_MESSAGE:
      return { ...state, successMessage: "", errorMessage: "" };
    default:
      return state;
  }
};

export default donationRequestReducer;
