/* eslint-disable space-before-function-paren */

import {
  GENERAL_UPDATE_REQUEST,
  GENERAL_UPDATE_SUCCESS,
  GENERAL_UPDATE_FAILURE,
  GENERAL_REQUEST,
  GENERAL_FAILURE,
  GENERAL_SUCCESS,
} from './GeneralActionType';

const initialState = {
  loader: false,
  general: {},
  screenloader: false,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GENERAL_UPDATE_REQUEST:
      return { ...state, loader: true };
    case GENERAL_UPDATE_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case GENERAL_UPDATE_FAILURE: {
      return { ...state, loader: false };
    }
    case GENERAL_REQUEST:
      return { ...state, screenloader: true };

    case GENERAL_FAILURE:
      return { ...state, screenloader: false };

    case GENERAL_SUCCESS:
      return { ...state, screenloader: false, general: action.payload };

    default:
      return state;
  }
}
