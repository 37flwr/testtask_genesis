import { all, fork } from "redux-saga/effects";

// Sagas
import { coursesSaga } from "../ducks/courses";

export default function* rootSaga() {
  yield all([
    //courses
    fork(coursesSaga),
  ]);
}
