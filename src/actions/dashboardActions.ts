import { DashboardTypes } from "./actionTypes";
import type { DasboardData, DateRangeType } from "../types/common";

const fetchDashboardData = (
  dateRange: DateRangeType,
  dataOwnerType: boolean
) => ({
  type: DashboardTypes.FETCH_DASHBOARD_DATA,
  dateRange,
  dataOwnerType,
});
const requestFetchDashboardData = () => ({
  type: DashboardTypes.REQUEST_FETCH_DASHBOARD_DATA,
});
const successFetchDashboardData = (
  successMessage: string,
  dashboardData: DasboardData
) => ({
  type: DashboardTypes.SUCCESS_FETCH_DASHBOARD_DATA,
  successMessage,
  dashboardData,
});
const failureFetchDashboardData = (errorMessage: string) => ({
  type: DashboardTypes.FAILURE_FETCH_DASHBOARD_DATA,
  errorMessage,
});
const resetMessage = () => ({ type: DashboardTypes.RESET_MESSAGE });

const dashboardActions = {
  fetchDashboardData,
  requestFetchDashboardData,
  successFetchDashboardData,
  failureFetchDashboardData,
  resetMessage,
};
export default dashboardActions;
