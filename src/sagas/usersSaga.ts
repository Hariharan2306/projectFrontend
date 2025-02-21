import { all, call, put, takeLatest } from "redux-saga/effects";
import type {
  LoginUserSagaProps,
  RegisterUserSagaProps,
} from "../types/common";
import usersActions from "../actions/usersActions";
import { SagaIterator } from "redux-saga";
import { UserTypes } from "../actions/actionTypes";
import { createUserService, loginUserService } from "../services/userServices";

function* registerUser({ userData }: RegisterUserSagaProps): SagaIterator {
  try {
    yield put(usersActions.requestRegisterUser());
    const response = yield call(() => createUserService(userData));
    yield put(usersActions.successRegisterUser(response.message));
  } catch (error) {
    yield put(usersActions.failureRegisterUser(error as Error));
  }
}

function* loginUser({ loginUser }: LoginUserSagaProps): SagaIterator {
  try {
    yield put(usersActions.requestLoginUser());
    const response = yield call(() => loginUserService(loginUser));
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
