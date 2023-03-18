import { put, takeEvery, select } from "redux-saga/effects";

import actions from "./actions";
import types from "./actionTypes";

const getCourses = (state) => state.Courses;

function* changeProgressSaga({ payload }) {
  try {
    const { courseId, lessonId, timing } = payload;
    const courses = yield select(getCourses);

    if (timing && lessonId && courseId) {
      const modifiedProgress = [
        ...courses.courses.map((c) => {
          let newProgress;

          if (c.progress.find((p) => p.lessonId === lessonId)) {
            newProgress = [
              ...c.progress.map((p) =>
                p.lessonId === lessonId ? { lessonId, timing } : p
              ),
            ];
          } else {
            newProgress = [
              ...c.progress,
              {
                lessonId,
                timing,
              },
            ];
          }

          return c.courseId === courseId
            ? {
                ...c,
                progress: newProgress,
              }
            : c;
        }),
      ];

      yield put(actions.changeProgressSuccess(modifiedProgress));
    } else {
      yield put(actions.apiError());
    }
  } catch {
    yield put(actions.apiError());
  }
}

function* changeActiveLessonSaga({ payload }) {
  try {
    const courses = yield select(getCourses);
    const { courseId, activeLessonId } = payload;

    const updatedCourse = courses.courses?.find((c) => c.courseId === courseId);

    if (updatedCourse) {
      const modifiedActiveLesson = [
        ...courses.courses.map((c) =>
          c.courseId === courseId ? { ...c, activeLessonId: activeLessonId } : c
        ),
      ];
      yield put(actions.changeActiveLessonSuccess(modifiedActiveLesson));
    } else {
      yield put(actions.apiError());
    }
  } catch {
    yield put(actions.apiError());
  }
}

function* initCourseSaga({ payload }) {
  try {
    const courses = yield select(getCourses);
    const { courseId, activeLessonId } = payload;

    const courseAlreadyInit = courses.courses?.find(
      (c) => c.courseId === courseId
    );

    if (!courseAlreadyInit) {
      let modifiedCourses;
      if (courses.courses.length > 0) {
        modifiedCourses = [
          ...courses.courses,
          {
            courseId,
            activeLessonId,
            progress: [],
          },
        ];
      } else {
        modifiedCourses = [
          {
            courseId,
            activeLessonId,
            progress: [],
          },
        ];
      }
      yield put(actions.changeActiveLessonSuccess(modifiedCourses));
    } else {
      yield put(actions.apiError());
    }
  } catch {
    console.log("faild");
    yield put(actions.apiError());
  }
}

function* coursesSaga() {
  yield takeEvery(types.CHANGE_PROGRESS, changeProgressSaga);
  yield takeEvery(types.CHANGE_ACTIVE_LESSON, changeActiveLessonSaga);
  yield takeEvery(types.INIT_COURSE, initCourseSaga);
}

export default coursesSaga;
