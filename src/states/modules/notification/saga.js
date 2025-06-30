import {
    all,
    fork,
    put,
    // takeLatest
} from "redux-saga/effects";
import {setTitlePage} from "../app";
// import {
//   getNotification
// } from "../../../utils/helper";
// import {
//   getListNotificationSuccess,
// } from "./index";

function* loadRouteData() {
    yield put(setTitlePage('Notification'));
}

function* handleActions() {
}

export default function* loadNotificationSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}