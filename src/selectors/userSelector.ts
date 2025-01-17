import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../apis/rootReducer";
import get from "lodash/get";

const userSelector = (state: RootState) => state.users;

export const successMessageSelector = createSelector(userSelector, (state) =>
  get(state, "successMessage", "")
);
export const errorMessageSelector = createSelector(userSelector, (state) =>
  get(state, "error", "")
);
