import {
  all, fork, put

} from "redux-saga/effects";
import {setTitlePage} from "../app";

function* loadRouteData () {
  yield put(setTitlePage('Trang chủ'));
}

function* handleActions () {
  //;
}

export default function* loadHomeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
