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
  createPostSuccess,
  createPostFail,
  approvePostSuccess,
  setVisibleModalApprovePost,
  rejectPostSuccess,
  setVisibleModalRejectPost,
  deletePostSuccess,
  deletePostFail,
  setVisibleModalDeletePost,
} from "./index";
import {
  getNotification
} from "../../../utils/helper";
import {
  getAllPost
} from "../../../api/post";
import {
  setLocation
} from "../app";

// import _ from "lodash";

function* loadRouteData() {
  yield put(setTitlePage('Bài viết'));
}

function* handleActions() {
  yield takeLatest(createPostSuccess, function* () {
    // getNotification('success', 'Create post success');
    yield put(setLocation({ pathName: "/" }));
  });

  yield takeLatest(createPostFail, function () {
    // let status = action.payload.status;
    // // if (status === 400) {
    // //   let errors = action.payload.data.errors;
    // //   yield put(({
    // //     title: _.get(errors, 'title', ''),
    // //     content: _.get(errors, 'content', ''),
    // //     image: _.get(errors, 'image', ''),
    // //   }));
    // // }
    getNotification('error', 'Create post fail');
  });
  yield takeLatest(approvePostSuccess, function* () {
    getNotification('success', 'Approve post success');
    yield put(setVisibleModalApprovePost(false));
    yield put(getAllPost());
  });

  yield takeLatest(rejectPostSuccess, function* () {
    getNotification('success', 'Reject post success');
    yield put(setVisibleModalRejectPost(false));
    yield put(getAllPost());
  });
  yield takeLatest(deletePostSuccess, function* () {
    getNotification('success', 'Xóa bài viết thành công');
    yield put(setVisibleModalDeletePost(false));
    // yield put(getAllPost());
  });
  yield takeLatest(deletePostFail, function () {
    getNotification('error', 'Xoá bài viết thất bại');
  });
}

export default function* loadPostClientSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}