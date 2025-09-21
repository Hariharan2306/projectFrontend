import type { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import dashboardActions from "../actions/dashboardActions";
import { parseError } from "./sagaHelper";
import { DashboardTypes } from "../actions/actionTypes";
import { fetchDashboardService } from "../services/dashboardService";
import type { DateRangeType, SagaProps } from "../types/common";

function* fetchDashboardData({
  dateRange,
  dataOwnerType,
}: {
  dateRange: DateRangeType;
  dataOwnerType: boolean;
} & SagaProps): SagaIterator {
  try {
    yield put(dashboardActions.requestFetchDashboardData());
    const response = yield call(() =>
      fetchDashboardService(dateRange, dataOwnerType)
    );
    yield put(
      dashboardActions.successFetchDashboardData(
        response.data.successMessage,
        response.data.dashboardData
      )
    );
  } catch (error) {
    yield put(
      dashboardActions.failureFetchDashboardData(parseError(error as object))
    );
  }
}

export default function* actionWatcher(): SagaIterator {
  yield all([
    yield takeLatest(DashboardTypes.FETCH_DASHBOARD_DATA, fetchDashboardData),
  ]);
}
