import {
  all, fork, put

} from "redux-saga/effects";
import {setTitlePage} from "../../app";

function* loadRouteData () {
  yield put(setTitlePage('Home'))
}

function* handleActions () {
  //;
}

export default function* loadHomeClientSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
