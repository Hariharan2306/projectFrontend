import { all, call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import requestActions from "../actions/requestActions";
import { DonationRequestTypes } from "../actions/actionTypes";
import { parseError } from "./sagaHelper";
import {
  fetchRequestDonationService,
  requestDonationService,
} from "../services/requestsService";
import type { RequestingData, SagaProps } from "../types/common";

function* requestDonation({
  requestingData,
}: { requestingData: RequestingData } & SagaProps): SagaIterator {
  try {
    yield put(requestActions.requestCreateDonationRequest());
    const response = yield call(() => requestDonationService(requestingData));
    yield put(
      requestActions.successCreateDonationRequest(response.data.successMessage)
    );
  } catch (e) {
    yield put(
      requestActions.failureCreateDonationRequest(parseError(e as object))
    );
  }
}

function* fetchRequestDonation(): SagaIterator {
  try {
    yield put(requestActions.requestFetchDonationRequests());
    const response = yield call(() => fetchRequestDonationService());
    yield put(requestActions.successFetchDonationRequests(response.data));
  } catch (e) {
    yield put(
      requestActions.failureFetchDonationRequests(parseError(e as object))
    );
  }
}

function* withdrawDonation({
  requestId,
}: { requestId: number } & SagaProps): SagaIterator {
  try {
    yield put(requestActions.requestWithdrawDonationRequest());
    const response = yield call(() => {});
    yield put(
      requestActions.successWithdrawDonationRequest(response.data.message)
    );
  } catch (e) {
    yield put(
      requestActions.failureWithdrawDonationRequest(parseError(e as object))
    );
  }
}

export default function* actionWatcher(): SagaIterator {
  yield all([
    yield takeLatest(
      DonationRequestTypes.CREATE_DONATION_REQUESTS,
      requestDonation
    ),
    yield takeLatest(
      DonationRequestTypes.FETCH_DONATION_REQUESTS,
      fetchRequestDonation
    ),
    yield takeLatest(
      DonationRequestTypes.WITHDRAW_DONATION_REQUESTS,
      withdrawDonation
    ),
  ]);
}
