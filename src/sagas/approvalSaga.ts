import { all, call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import approvalActions from "../actions/approvalActions";
import { SagaProps } from "../types/common";
import { ApprovementTypes } from "../actions/actionTypes";
import { parseError } from "./sagaHelper";

function* fetchApprovals(): SagaIterator {
  try {
    yield put(approvalActions.requestFetchApprovals);
    const response = yield call(() => {});
    yield put(approvalActions.successFetchApprovals(response.data));
  } catch (error) {
    yield put(
      approvalActions.failureFetchApprovals(parseError(error as object))
    );
  }
}

function* fetchRequesterDetails({
  reqId,
}: { reqId: number } & SagaProps): SagaIterator {
  try {
    yield put(approvalActions.requestFetchRequesterDetails);
    const response = yield call(() => {});
    yield put(approvalActions.successFetchRequesterDetails(response.data));
  } catch (error) {
    yield put(
      approvalActions.failureFetchRequesterDetails(parseError(error as object))
    );
  }
}

function* approveDonationRequests({
  reqId,
}: { reqId: number } & SagaProps): SagaIterator {
  try {
    yield put(approvalActions.requestApproveDonationRequests);
    const response = yield call(() => {});
    yield put(approvalActions.successApproveDonationRequests(response.data));
  } catch (error) {
    yield put(
      approvalActions.failureApproveDonationRequests(
        parseError(error as object)
      )
    );
  }
}

export default function* actionWatcher(): SagaIterator {
  yield all([
    yield takeLatest(ApprovementTypes.FETCH_APPROVALS, fetchApprovals),
    yield takeLatest(
      ApprovementTypes.FETCH_REQUESTER_DETAILS,
      fetchRequesterDetails
    ),
    yield takeLatest(
      ApprovementTypes.APPROVE_DONATION_REQUESTS,
      approveDonationRequests
    ),
  ]);
}
