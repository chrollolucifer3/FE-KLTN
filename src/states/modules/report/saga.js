import {
    all,
    fork,
    // put,
} from "redux-saga/effects";
// import {setTitlePage} from "../app";

function* loadRouteData() {

}

function* handleActions() {

}

export default function* loadReportSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}