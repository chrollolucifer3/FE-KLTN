import {
  all,
  fork,
  put,
  takeLatest
} from "redux-saga/effects";
import {
  setTitlePage
} from "../app";

import {
  createCategorySubFail,
  createCategorySubSuccess,
  createCategoryParentSuccess,
  createCategoryParentFail,
  updateCategorySuccess,
  updateCategoryFail,
} from "./index";
import {getAllCategories,getAllCategoryParentForAdmin} from "../../../api/category";
import {
  getNotification
} from "../../../utils/helper";

function* loadRouteData() {
  yield put(setTitlePage('Danh mục'));
}

function* handleActions() {
  yield takeLatest(createCategoryParentSuccess, function* () {
    getNotification('success', 'Tạo danh mục cha thành công');
    yield put(getAllCategories());
    yield put(getAllCategoryParentForAdmin());
  });

  yield takeLatest(createCategoryParentFail, function () {
    getNotification('error', 'Tạo danh mục cha thất bại');
  });

  yield takeLatest(createCategorySubSuccess, function* () {
    getNotification('success', 'Tạo danh mục con thành công');
    yield put(getAllCategories());
    yield put(getAllCategoryParentForAdmin());
  });

  yield takeLatest(createCategorySubFail, function () {
    getNotification('error', 'Tạo danh mục con thất bại');
  });
  yield takeLatest(updateCategorySuccess, function* () {
    getNotification('success', 'Cập nhật danh mục thành công');
    yield put(getAllCategories());
    yield put(getAllCategoryParentForAdmin());
  });
  yield takeLatest(updateCategoryFail, function () {
    getNotification('error', 'Cập nhật danh mục thất bại');
  });
}

export default function* loadPostClientSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}