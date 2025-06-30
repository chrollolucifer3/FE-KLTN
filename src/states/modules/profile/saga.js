import {
  all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  changePasswordFail,
  changePasswordSuccess, setErrorChangePassword,
  setErrorInfoUser,
  updateInfoUserFail,
  updateInfoUserSuccess
} from "./index";
import {getNotification} from "../../../utils/helper";
import {getMe} from "../../../api/auth";
import _ from "lodash";

function* loadRouteData () {
  yield put(setTitlePage('Thông tin cá nhân'));
  yield put(setErrorInfoUser({
    name: '',
    email: '',
    phone: '',
  }));
  yield put(setErrorChangePassword({
    currentPassword: '',
    password: '',
    confirmPassword: ''
  }));
}

function* handleActions () {
  yield takeLatest(updateInfoUserSuccess, function* () {
    getNotification('success', 'Update info user success');
    yield put(getMe());
  });

  yield takeLatest(updateInfoUserFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorInfoUser({
        name: _.get(errors, 'name', ''),
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone', ''),
      }));
    }
    getNotification('error', 'Create info user fail');
  });

  yield takeLatest(changePasswordSuccess, function* () {
    yield call(getNotification, 'success', 'Change password success');
    yield put(getMe());
  });

  yield takeLatest(changePasswordFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorChangePassword({
        currentPassword: _.get(errors, 'current_password', ''),
        password: _.get(errors, 'password', ''),
        confirmPassword: _.get(errors, 'password_confirmation', ''),
      }));
    }
    getNotification('error', 'Change password fail');
  });
}

export default function* loadProfileSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
