import {
  all, fork, put
} from "redux-saga/effects";
import {setTitlePage} from "../app";

function* loadRouteData () {
  yield put(setTitlePage('About'));
}

function* handleActions () {
  //;
}

export default function* loadAboutSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
