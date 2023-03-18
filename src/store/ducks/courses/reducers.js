import actions from "./actionTypes";

const initialState = {
  courses: [],
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
        courses: action.payload,
        loading: false,
      };
    case actions.CHANGE_ACTIVE_LESSON:
      return {
        ...state,
        loading: true,
      };
    case actions.CHANGE_ACTIVE_LESSON_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case actions.INIT_COURSE:
      return {
        ...state,
        loading: true,
      };
    case actions.INIT_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.payload,
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
