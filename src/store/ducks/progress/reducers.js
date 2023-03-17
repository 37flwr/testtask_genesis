import actions from "./actionTypes";

const initialState = {
  progress: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHANGE_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case actions.CHANGE_PROGRESS_SUCCESS:
      return {
        ...state,
        progress: action.payload,
        loading: false,
      };
    case actions.API_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
