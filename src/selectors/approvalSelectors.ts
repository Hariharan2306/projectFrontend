import { createSelector } from "@reduxjs/toolkit";
import get from "lodash/get";
import type { RootState } from "../apis/rootReducer";
import type { SuccessFetchRequestAction } from "../types/common";

const approvalSelector = (state: RootState) => state.approvals;

export const successMessageSelector = createSelector(
  approvalSelector,
  (state) => get(state, "successMessage", "")
);
export const errorMessageSelector = createSelector(approvalSelector, (state) =>
  get(state, "errorMessage", "")
);
export const approvalsSelector = createSelector(approvalSelector, (state) =>
  get(state, "approvalData", [])
);
export const approvalCountSelector = createSelector(approvalSelector, (state) =>
  get(state, "approvalCount", 0)
);
export const requesterDetailSelector = createSelector(
  approvalSelector,
  (state) =>
    get(
      state,
      "requesterData",
      {}
    ) as SuccessFetchRequestAction["requesterData"]
);
