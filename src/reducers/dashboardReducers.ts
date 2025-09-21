import { DashboardTypes } from "../actions/actionTypes";
import type { CommonReducerType } from "../types/common";

const initialState = {
  successMessage: "",
  errorMessage: "",
  type: "",
  dashboardData: {},
};

export const dashboardReducer = (
  state = initialState,
  action: CommonReducerType & { dashboardData: any }
) => {
  switch (action.type) {
    case DashboardTypes.SUCCESS_FETCH_DASHBOARD_DATA:
      return {
        ...state,
        successMessage: action.successMessage,
        dashboardData: action.dashboardData,
      };
    case DashboardTypes.FAILURE_FETCH_DASHBOARD_DATA:
      return { ...state, errorMessage: action.errorMessage };
    case DashboardTypes.RESET_MESSAGE:
      return { ...state, successMessage: "", errorMessage: "" };
    default:
      return state;
  }
};
