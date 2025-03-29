import type { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import get from "lodash/get";
import usersActions from "../actions/usersActions";
import { createUserService, loginUserService } from "../services/userServices";
import { UserTypes } from "../actions/actionTypes";
import type { LoginDetails, SagaProps, UserData } from "../types/common";

function* registerUser({
  userData,
}: { userData: UserData } & SagaProps): SagaIterator {
  try {
    yield put(usersActions.requestRegisterUser());
    const response = yield call(() => createUserService(userData));
    yield put(usersActions.successRegisterUser(response.data.message));
  } catch (error) {
    yield put(
      usersActions.failureRegisterUser(get(error, "response.data.error", ""))
    );
  }
}

function* loginUser({
  loginDetails,
}: { loginDetails: LoginDetails } & SagaProps): SagaIterator {
  try {
    yield put(usersActions.requestLoginUser());
    const response = yield call(() => loginUserService(loginDetails));
    yield put(usersActions.successLoginUser(response.data));
  } catch (error) {
    yield put(
      usersActions.failureLoginUser(get(error, "response.data.error", ""))
    );
  }
}

export default function* actionWatcher(): SagaIterator {
  yield all([
    yield takeLatest(UserTypes.CREATE_USER_DETAILS, registerUser),
    yield takeLatest(UserTypes.LOGIN_USER, loginUser),
  ]);
}
