import {
    all,
    fork,
    put,
    takeLatest
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  getNotification
} from "../../../utils/helper";
import {getAllDocument} from "../../../api/document";
import {approveDocumentSuccess,
    approveDocumentFail,
    setVisibleModalApprove,
    setVisibleModalReject,
    rejectDocumentFail, rejectDocumentSuccess
} from "./index";

function* loadRouteData() {
    yield put(setTitlePage('Tài liệu'));
}

function* handleActions() {
    yield takeLatest(approveDocumentSuccess, function* () {
        getNotification('success', 'Duyệt tài liệu thành công');
        yield put(setVisibleModalApprove(false));
        yield put(getAllDocument());
    });

     yield takeLatest(approveDocumentFail, function* () {
        getNotification('fail', 'Duyệt tài liệu thất bại');
        yield put(setVisibleModalApprove(false));
      });

    yield takeLatest(rejectDocumentSuccess, function* () {
        getNotification('success', 'Từ chối tài liệu thành công');
        yield put(setVisibleModalReject(false));
        yield put(getAllDocument());
    });
    yield takeLatest(rejectDocumentFail, function* () {
        getNotification('fail', 'Từ chối tài liệu thất bại');
        yield put(setVisibleModalReject(false));
    });
}

export default function* loadDocumentSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}