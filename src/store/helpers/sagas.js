import { all, fork } from "redux-saga/effects";

// Sagas
import { progressSaga } from "../ducks/progress";

export default function* rootSaga() {
  yield all([
    //progress
    fork(progressSaga),
  ]);
}
