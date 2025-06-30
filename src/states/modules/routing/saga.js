import { all, fork, takeLatest } from "redux-saga/effects";
import {ROUTE_SAGAS} from "../../../router/rootSaga";
import {initialSaga} from "./index";

export function* watchRouteSagas() {
  let routeSagas = ROUTE_SAGAS;
  yield takeLatest(initialSaga, function* (action) {
    yield fork(routeSagas[action.payload])
  });
}

export default function* routes() {
  yield all([
    fork(watchRouteSagas),
  ]);
}
