import {
  fork,
  all
} from 'redux-saga/effects'
import appSaga from '../modules/app/saga';
import routeSaga from '../modules/routing/saga';
import loadAuthSaga from '../modules/auth/saga';
import loadCommentSaga from '../modules/comment/saga';
import loadReportSaga from '../modules/report/saga';
import loadProfileSaga from '../modules/profile/saga';
// import loadEmployeeSaga from '../modules/employee/saga';
// import loadDocumentSaga from '../modules/document/saga';

export default function* sagas() {
  yield all([
    fork(routeSaga),
    fork(appSaga),
    fork(loadAuthSaga),
    fork(loadCommentSaga),
    fork(loadReportSaga),
    fork(loadProfileSaga),

    // fork(loadEmployeeSaga),
    // fork(loadDocumentSaga)
  ]);
}