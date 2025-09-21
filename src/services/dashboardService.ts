import { api } from "../apis/helper";
import type { DateRangeType, LoggedUserData } from "../types/common";

export const fetchDashboardService = async (
  dateRange: DateRangeType,
  dataOwnerType: boolean
) => {
  const userData: LoggedUserData = JSON.parse(
    sessionStorage.getItem("loggedUserData") || "{}"
  );
  const url = "/dashboard/";
  const result = api.get(url, {
    params: {
      ...userData,
      dateRange: JSON.stringify(dateRange),
      dataOwnerType,
    },
  });
  return result;
};
