import {
  all, fork, put, takeLatest
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  changePasswordFail,
  setErrorChangePassword,
  setErrorInfoUser,
  updateInfoUserFail,
  // updateInfoUserSuccess
} from "./index";
// import {getNotification} from "../../../utils/helper";
// import {getMe} from "../../../api/auth";
import _ from "lodash";

function* loadRouteData () {
  yield put(setTitlePage('Thông tin cá nhân'));
  yield put(setErrorInfoUser({
    fullName: '',
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
  // yield takeLatest(updateInfoUserSuccess, function* () {
  //   // getNotification('success', 'Update info user success');
  //   // yield put(getMe());
  // });

  yield takeLatest(updateInfoUserFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorInfoUser({
        fullName: _.get(errors, 'fullName', ''),
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone', ''),
      }));
    }
    // getNotification('error', 'Create info user fail');
  });

  // yield takeLatest(changePasswordSuccess, function* () {
  //   // yield call(getNotification, 'success', 'Change password success');
  //   yield put(getMe());
  // });

  yield takeLatest(changePasswordFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.message;
      yield put(setErrorChangePassword({
        oldPassword: errors,
      }));
    }
    if (status === 404) {
      let errors = action.payload.data.message;
      yield put(setErrorChangePassword({
        newPassword: errors,
      }));
    }
    // getNotification('error', 'Change password fail');
  });
}

export default function* loadProfileSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
