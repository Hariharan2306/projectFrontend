import get from "lodash/get";
import { DonationTypes } from "../actions/actionTypes";
import type { CommonReducerType, DonationData } from "../types/common";

type DonationReducerType = {
  donationData: DonationData["row"][];
  donationCount: number;
};

const initialReducer: DonationReducerType & CommonReducerType = {
  successMessage: "",
  errorMessage: "",
  type: "",
  donationData: [] as DonationData["row"][],
  donationCount: 0,
};

export const donationReducer = (
  state = initialReducer,
  action: DonationReducerType & CommonReducerType
) => {
  switch (action.type) {
    case DonationTypes.FAILURE_ADD_DONATION:
    case DonationTypes.FAILURE_FETCH_DONATION_DATA:
      return {
        ...state,
        errorMessage: get(action, "errorMessage", action.error) || "",
      };
    case DonationTypes.SUCCESS_ADD_DONATION:
    case DonationTypes.SUCCESS_FETCH_DONATION_DATA:
      return {
        ...state,
        successMessage: action.successMessage,
        donationData: action.donationData,
        donationCount: action.donationCount,
      };
    case DonationTypes.RESET_MESSAGE:
      return { ...state, successMessage: "", errorMessage: "" };
    default:
      return state;
  }
};
