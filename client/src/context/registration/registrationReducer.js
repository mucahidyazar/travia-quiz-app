import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_LOGIN_ACTIVE,
  SET_REGISTER_ACTIVE,
  USER_LOADED,
} from "../actionTypes";

const registrationReducer = (state, action) => {
  switch (action.type) {
    //
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    //
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    //
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    //
    case SET_LOGIN_ACTIVE:
      return {
        ...state,
        sectionLogin: "active",
        sectionRegister: "",
      };

    //
    case SET_REGISTER_ACTIVE:
      return {
        ...state,
        sectionRegister: "active",
        sectionLogin: "",
      };

    //
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default registrationReducer;
