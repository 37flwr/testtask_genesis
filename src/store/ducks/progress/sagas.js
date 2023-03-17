import { put, takeEvery, select } from "redux-saga/effects";

import actions from "./actions";
import types from "./actionTypes";

const getProgress = (state) => state.Progress;

function* changeProgressSaga({ payload }) {
  try {
    const progress = yield select(getProgress);

    const modifiedProgress = [
      ...progress.progress.filter(
        (lesson) => lesson.lesson_id !== payload.lesson_id
      ),
      payload,
    ];
    yield put(actions.changeProgressSuccess(modifiedProgress));
  } catch {
    yield put(actions.apiError());
  }
}

function* progressSaga() {
  yield takeEvery(types.CHANGE_PROGRESS, changeProgressSaga);
}

export default progressSaga;
