/* eslint-disable  */
import { normalize } from 'normalizr';
import * as api from '../../modules/api';
import { userSchema } from '../../model/userSchema';
import { errorIterator } from '../../modules/ErroHandlers';
import { toast } from 'react-toastify';

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOGOUT,
} from './LoginActionType';

export const logIn = (credentials, history) => dispatch => {
  dispatch({
    type: LOG_IN_REQUEST,
    payload: credentials,
  });

  return api
    .logIn(credentials)
    .then(data => {
      toast.success(data.message);
      if (data) {
        api.setToken(data.data.email);
        dispatch({
          type: LOG_IN_SUCCESS,
          payload: data.data,
        });
      }
    })
    .catch(error => {
      dispatch({
        type: LOG_IN_FAILURE,
      });
      toast.error(error);
    });
};

export const logOut = credentials => dispatch => {
  dispatch({
    type: LOGOUT,
  });
  api.clearToken();
};
