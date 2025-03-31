import { all, call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import donationActions from "../actions/donationActions";
import { DonationTypes } from "../actions/actionTypes";
import {
  addDonationService,
  fetchDonationService,
} from "../services/donationService";
import { parseError } from "./sagaHelper";
import type { ApiDonationData, SagaProps } from "../types/common";

function* addDonation({
  donationData,
}: { donationData: ApiDonationData } & SagaProps): SagaIterator {
  try {
    yield put(donationActions.requestAddDonation);
    const response = yield call(() => addDonationService(donationData));
    yield put(donationActions.successAddDonation(response.data.message));
  } catch (error) {
    yield put(donationActions.failureAddDonation(parseError(error as object)));
  }
}

function* fetchDonationData(): SagaIterator {
  try {
    yield put(donationActions.requestFetchDonationData);
    const response = yield call(() => fetchDonationService());
    yield put(donationActions.successAddDonation(response.data.donationData));
  } catch (error) {
    yield put(
      donationActions.failureFetchDonationData(parseError(error as object))
    );
  }
}

export default function* actionWatcher(): SagaIterator {
  yield all([
    yield takeLatest(DonationTypes.ADD_DONATION, addDonation),
    yield takeLatest(DonationTypes.FETCH_DONATION_DATA, fetchDonationData),
  ]);
}
