import { createSelector } from "@reduxjs/toolkit";
import get from "lodash/get";
import type { RootState } from "../apis/rootReducer";

const donationRequestsSelector = (state: RootState) => state.donationRequests;

export const successMessageSelector = createSelector(
  donationRequestsSelector,
  (state) => get(state, "successMessage", "")
);
export const errorMessageSelector = createSelector(
  donationRequestsSelector,
  (state) => get(state, "errorMessage", "")
);
export const donationRequestsDataSelector = createSelector(
  donationRequestsSelector,
  (state) => get(state, "donationData", [])
);
