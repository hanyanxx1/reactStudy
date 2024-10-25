import { put, take, fork } from "../redux-saga/effects";
import * as types from "./action-types";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function* workerSaga() {
  yield delay(1000);
  yield put({ type: types.ADD });
}

function* watcherSaga() {
  yield take(types.ASYNC_ADD);
  yield fork(workerSaga);
}

export default function* rootSaga() {
  yield watcherSaga();
}
