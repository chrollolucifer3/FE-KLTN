import {
    all,
    fork,
    takeLatest,
    // put,
} from "redux-saga/effects";
// import {setTitlePage} from "../app";
import {
    getNotification
} from "../../../utils/helper";
// import {
//     getCommentsFromPost
// } from "../../../api/post";
import {
    createCommentSuccess,
    createCommentFail,
} from "./index";

function* loadRouteData() {

}

function* handleActions() {
    yield takeLatest(createCommentSuccess, function () {
        getNotification('success', 'Create comment success');
    });

    yield takeLatest(createCommentFail, function () {
        getNotification('error', 'Create comment fail');
    });
}

export default function* loadCommentSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}