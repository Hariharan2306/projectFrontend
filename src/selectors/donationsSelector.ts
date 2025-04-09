import { createSelector } from "@reduxjs/toolkit";
import get from "lodash/get";
import type { RootState } from "../apis/rootReducer";

const donationSelector = (state: RootState) => state.donations;

export const successMessageSelector = createSelector(
  donationSelector,
  (state) => get(state, "successMessage", "")
);
export const errorMessageSelector = createSelector(donationSelector, (state) =>
  get(state, "errorMessage", "")
);
export const donationDataSelector = createSelector(donationSelector, (state) =>
  get(state, "donationData", [])
);
export const donationCountSelector = createSelector(donationSelector, (state) =>
  get(state, "donationCount", 0)
);
