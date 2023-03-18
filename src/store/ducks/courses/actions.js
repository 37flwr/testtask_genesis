import types from "./actionTypes";

const changeProgress = (payload) => ({
  type: types.CHANGE_PROGRESS,
  payload,
});

const changeProgressSuccess = (payload) => ({
  type: types.CHANGE_PROGRESS_SUCCESS,
  payload,
});

const changeActiveLesson = (payload) => ({
  type: types.CHANGE_ACTIVE_LESSON,
  payload,
});

const changeActiveLessonSuccess = (payload) => ({
  type: types.CHANGE_ACTIVE_LESSON_SUCCESS,
  payload,
});

const initCourse = (payload) => ({
  type: types.INIT_COURSE,
  payload,
});

const initCourseSuccess = (payload) => ({
  type: types.INIT_COURSE_SUCCESS,
  payload,
});

const apiError = () => ({
  type: types.API_ERROR,
});

const actions = {
  changeProgress,
  changeProgressSuccess,
  changeActiveLesson,
  changeActiveLessonSuccess,
  initCourse,
  initCourseSuccess,
  apiError,
};

export default actions;
