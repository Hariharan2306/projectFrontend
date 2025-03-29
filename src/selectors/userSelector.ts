import { createSelector } from "@reduxjs/toolkit";
import get from "lodash/get";
import type { RootState } from "../apis/rootReducer";
import type { LoggedUserData } from "../types/common";

const userSelector = (state: RootState) => state.users;

export const successMessageSelector = createSelector(userSelector, (state) =>
  get(state, "successMessage", "")
);
export const errorMessageSelector = createSelector(userSelector, (state) =>
  get(state, "error", "")
);
export const userDataSelector = createSelector(
  userSelector,
  (state) => get(state, "userData", {}) as LoggedUserData
);
