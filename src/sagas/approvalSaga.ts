import { all, call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import approvalActions from "../actions/approvalActions";
import { FetchApiProps, SagaProps } from "../types/common";
import { ApprovementTypes } from "../actions/actionTypes";
import { parseError } from "./sagaHelper";
import {
  approveDonationRequestsService,
  fetchApprovalService,
  fetchRequesterDetailsService,
} from "../services/approvalService";

function* fetchApprovals({
  search,
  page,
  pageSize,
  dateRange,
  quantity,
}: FetchApiProps & SagaProps): SagaIterator {
  try {
    yield put(approvalActions.requestFetchApprovals());
    const response = yield call(() =>
      fetchApprovalService(search, page, pageSize, dateRange, quantity)
    );
    yield put(
      approvalActions.successFetchApprovals(
        response.data.successMessage,
        response.data.approvalData,
        response.data.approvalCount
      )
    );
  } catch (error) {
    yield put(
      approvalActions.failureFetchApprovals(parseError(error as object))
    );
  }
}

function* fetchRequesterDetails({
  reqId,
}: { reqId: string } & SagaProps): SagaIterator {
  try {
    yield put(approvalActions.requestFetchRequesterDetails());
    const response = yield call(() => fetchRequesterDetailsService(reqId));
    yield put(
      approvalActions.successFetchRequesterDetails(
        response.data.requesterDetails
      )
    );
  } catch (error) {
    yield put(
      approvalActions.failureFetchRequesterDetails(parseError(error as object))
    );
  }
}

function* approveDonationRequests({
  reqId,
  isApproval,
}: { reqId: string; isApproval: boolean } & SagaProps): SagaIterator {
  try {
    yield put(approvalActions.requestApproveDonationRequests());
    const response = yield call(() =>
      approveDonationRequestsService(reqId, isApproval)
    );
    yield put(
      approvalActions.successApproveDonationRequests(
        response.data.successMessage
      )
    );
    yield put(approvalActions.fetchApprovals());
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
