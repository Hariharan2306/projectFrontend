import { all, call, put, takeLatest } from "redux-saga/effects";
import type { LoginDetails, UserData } from "../types/common";
import usersActions from "../actions/usersActions";
import { SagaIterator } from "redux-saga";
import { UserTypes } from "../actions/actionTypes";
import { createUserService, loginUserService } from "../services/userServices";

function* registerUser(userData?: UserData): SagaIterator {
  try {
    yield put(usersActions.requestRegisterUser());
    const response = yield call(() => createUserService(userData as UserData));
    yield put(usersActions.successRegisterUser(response.message));
  } catch (error) {
    yield put(usersActions.failureRegisterUser(error as Error));
  }
}

function* loginUser(loginDetails?: LoginDetails): SagaIterator {
  try {
    yield put(usersActions.requestLoginUser());
    const response = yield call(() =>
      loginUserService(loginDetails as LoginDetails)
    );
    yield put(usersActions.successLoginUser(response.message));
  } catch (error) {
    yield put(usersActions.failureLoginUser(error as Error));
  }
}

export default function* actionWatcher(): SagaIterator {
  yield all([
    yield takeLatest(UserTypes.CREATE_USER_DETAILS, registerUser),
    yield takeLatest(UserTypes.LOGIN_USER, loginUser),
  ]);
}
