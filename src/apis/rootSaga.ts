import { all } from "redux-saga/effects";
import usersSaga from "../sagas/usersSaga";
import donationSaga from "../sagas/donationsSaga";
import donationRequestsSaga from "../sagas/donationRequestsSaga";
import approvalSaga from "../sagas/approvalSaga";

export default function* rootSaga() {
  yield all([
    usersSaga(),
    donationSaga(),
    donationRequestsSaga(),
    approvalSaga(),
  ]);
}
