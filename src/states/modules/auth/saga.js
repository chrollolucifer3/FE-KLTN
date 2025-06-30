import {
  all,
  fork,
  takeLatest,
  put
} from "redux-saga/effects";
import {
  startRequestLoginSuccess,
  startRequestLoginFail,
  startRequestRegisterFail,
  startRequestRegisterSuccess,
  startUpdateAvatarSuccess,
  startUpdateAvatarFail,
  startRequestForgotPasswordFail,
} from "./index";
import {
  setAdminToken
} from "../../../utils/localStorage";
import {
  setClientToken
} from "../../../utils/localStorage";
import {
  getMe,
  getMeUser
} from "../../../api/auth";
import {
  setLocation
} from "../app";
import {
  getNotification
} from "../../../utils/helper";
import {
  setErrorLogin,
  setErrorRegister,
  setErrorDataForgotPassword
} from "./index";
import _ from "lodash";
// import { Navigate } from "react-router-dom";

function* loadRouteData() {
  //
}

function* handleActions() {
  yield takeLatest(startRequestLoginSuccess, function* (action) {
    const {
      result
    } = action.payload;

    if (result.adminToken) {
      setAdminToken(result.adminToken);
      yield put(getMe());
      yield put(setLocation({
        pathName: "/admin"
      }));
    }

    // Nếu có clientToken → xử lý user
    else if (result.clientToken) {
      setClientToken(result.clientToken);
      yield put(getMeUser());
      yield put(setLocation({
        pathName: "/"
      }));
    }
  });

  yield takeLatest(startRequestLoginFail, function* (action) {
    let statusError = action.payload.data.code;
    const errorMessage = _.get(action, 'payload.data.message');
    if (statusError === 404) {
      yield put(setErrorLogin({
        username: errorMessage,
      }));
    } else if(statusError === 400) {
      yield put(setErrorLogin({
        password: errorMessage,
      }));
    } else {
      getNotification('error', 'Server error');
    }
  });

  yield takeLatest(startRequestRegisterSuccess, function* () {
    // getNotification('success', 'Register success');
    yield put(setLocation({
      pathName: '/login'
    }));
  });

    yield takeLatest(startRequestRegisterFail, function* (action) {
    let statusError = action.payload.status;
    if (statusError === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorRegister({
        username: _.get(errors, 'username', ''),
        fullName: _.get(errors, 'fullName', ''), // Changed from name to
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone', ''),
        password: _.get(errors, 'password', ''),
      }));
      errors;
    } else if (statusError === 401) {
      getNotification('error', action.payload.data.message);
    } else {
      getNotification('error', 'Server error');
    }
  });
  yield takeLatest(startUpdateAvatarSuccess, function* () {
    getNotification('success', 'Update avatar success');
    yield put(getMeUser());
  });
  yield takeLatest(startUpdateAvatarFail, function () {
    getNotification('error', 'Update avatar fail');
  });

  yield takeLatest(startRequestForgotPasswordFail, function* (action) {
    let statusError = action.payload.data.code;
    if(statusError === 404) {
      yield put(setErrorDataForgotPassword({
        email: action.payload.data.message,
      }));
    } else {
      getNotification('error', 'Server error');
    }
  });
}

export default function* loadAuthSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}