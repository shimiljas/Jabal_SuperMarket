/* eslint-disable no-param-reassign */
/* eslint-disable space-before-function-paren */
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOGOUT,
} from './LoginActionType';
import { GENERAL_UPDATE_SUCCESS } from '../Settings/GeneralInfo/GeneralActionType';

const initialState = {
  loader: false,
  data: {},
  isAuthenticated: false,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return { ...state, loader: true };
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        loader: false,
        data: action.payload,
        isAuthenticated: true,
      };
    }
    case GENERAL_UPDATE_SUCCESS:
      state.data.name = action.payload.name;
      console.log(action.payload, 'sdfsdf---------------');
      return { ...state };

    case LOG_IN_FAILURE: {
      return { ...state, loader: false, isAuthenticated: false };
    }
    case LOGOUT: {
      state.data = {};
      state.isAuthenticated = false;
      return { ...state };
    }
    default:
      return state;
  }
}
