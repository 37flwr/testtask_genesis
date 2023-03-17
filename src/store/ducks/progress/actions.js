import types from "./actionTypes";

const changeProgress = (payload) => ({
  type: types.CHANGE_PROGRESS,
  payload,
});

const changeProgressSuccess = (payload) => ({
  type: types.CHANGE_PROGRESS_SUCCESS,
  payload,
});

const apiError = () => ({
  type: types.API_ERROR,
});

const actions = {
  changeProgress,
  changeProgressSuccess,
  apiError,
};

export default actions;
