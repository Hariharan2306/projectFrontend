import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../apis/rootReducer";
import get from "lodash/get";
import { DasboardData } from "../types/common";

const dashboardSelector = (state: RootState) => state.dashboard;

export const successMessageSelector = createSelector(
  dashboardSelector,
  (state) => get(state, "successMessage", "")
);
export const errorMessageSelector = createSelector(dashboardSelector, (state) =>
  get(state, "errorMessage", "")
);
export const fetchDashboardDataSelector = createSelector(
  dashboardSelector,
  (state) => get(state, "dashboardData", {}) as DasboardData
);
