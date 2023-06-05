import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,

  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,

  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,

  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  
  CLEAR_ERRORS,
} from "../constants/authConstants";


export const loginReducer = (state = { user: {} }, action) => {

  switch (action.type) {

    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
   
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

      default:
        return state;

  }
  
};


export const registerReducer = (state = { user: {} }, action) => {

  switch (action.type) {

    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
   
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

      default:
        return state;

  }
  
};


export const loadUserReducer = (state = { user: {} }, action) => {

  switch (action.type) {

    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
   
      case LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

      default:
        return state;

  }
  
};


export const logoutReducer = (state = { user: {} }, action) => {

  switch (action.type) {

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

      case LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };    

      default:
        return state;

  }
  
};
