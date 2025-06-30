import {
  all,
  fork,
  put,
  takeLatest,
  call
} from "redux-saga/effects";
import {
  setTitlePage
} from "../app";
import {
  // getAllRoleForEmployee,
  getListEmployee
} from "../../../api/employee";
import {
  setErrorCreateOrUpdateEmployee,
  setVisibleModalCreateOrUpdateEmployee,
  setVisibleModalDeleteEmployee,
  createEmployeeFail,
  createEmployeeSuccess,
  updateEmployeeFail,
  updateEmployeeSuccess,
  deleteEmployeeFail,
  deleteEmployeeSuccess,
  // getFollowingSuccess,
  // getFollowingFail,
  // unFollowUserSuccess,
  // unFollowUserFail,
  unBlockEmployeeSuccess,
  unBlockEmployeeFail,setVisibleModalUnBlockEmployee
} from "./index";
import {
  getNotification
} from "../../../utils/helper";
import _ from "lodash";


function* loadRouteData() {
  yield put(setTitlePage('Quản lý Tài khoản'));
  // yield put(getListEmployee());
  // yield put(getAllRoleForEmployee());
}

function* handleActions() {
  yield takeLatest(createEmployeeSuccess, function* () {
    getNotification('success', 'Create employee success');
    yield put(setVisibleModalCreateOrUpdateEmployee(false));
    // yield put(getListEmployee());
  });

  yield takeLatest(createEmployeeFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorCreateOrUpdateEmployee({
        username : _.get(errors, 'username', ''),
        fullName: _.get(errors, 'fullName', ''),
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone', ''),
        password: _.get(errors, 'password', ''),
      }));
    }
    getNotification('error', 'Create employee fail');
  });

  yield takeLatest(updateEmployeeSuccess, function* () {
    getNotification('success', 'Update employee success');
    yield put(setVisibleModalCreateOrUpdateEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(updateEmployeeFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorCreateOrUpdateEmployee({
        fullName: _.get(errors, 'fullName', ''),
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone', ''),
      }));
    }
    getNotification('error', 'Update employee fail');
  });


  yield takeLatest(deleteEmployeeSuccess, function* () {
    getNotification('success', 'Delete employee success');
    yield put(setVisibleModalDeleteEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(deleteEmployeeFail, function* () {
    yield call(getNotification, 'error', 'Failed to delete employee.');
  });

  yield takeLatest(unBlockEmployeeSuccess, function* () {
    getNotification('success', 'Unblock employee success');
    yield put(setVisibleModalUnBlockEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(unBlockEmployeeFail, function* () {
    yield call(getNotification, 'error', 'Unblock employee fail');
  });

  // yield takeLatest(getFollowingSuccess, function () {
  //   getNotification('success', 'Get following success');
  // });
  // yield takeLatest(getFollowingFail, function () {
  //   getNotification('error', 'Get following fail');
  // });
  // yield takeLatest(unFollowUserSuccess, function () {
  //   getNotification('success', 'Unfollow user success');
  // });
  // yield takeLatest(unFollowUserFail, function () {
  //   getNotification('error', 'Unfollow user fail');
  // });
}

export default function* loadEmployeeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}