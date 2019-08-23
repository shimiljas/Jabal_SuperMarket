/* eslint-disable */

import * as api from '../../../modules/api';
import { errorIterator } from '../../../modules/ErroHandlers';
import { toast } from 'react-toastify';
import { quotedSchema } from '../../../model/quotedDemandSchema';
import { generalSchema } from '../../../model/userSchema';
import {
  GENERAL_UPDATE_REQUEST,
  GENERAL_UPDATE_SUCCESS,
  GENERAL_UPDATE_FAILURE,
  GENERAL_REQUEST,
  GENERAL_FAILURE,
  GENERAL_SUCCESS,
} from './GeneralActionType';

export const updateGeneralInfo = credential => dispatch => {
  dispatch({
    type: GENERAL_UPDATE_REQUEST,
  });

  return api
    .updateGeneralInfo(credential)
    .then(data => {
      console.log(data);
      if (data) {
        dispatch({
          type: GENERAL_UPDATE_SUCCESS,
          payload: data.data,
        });
        toast.success(data.message);
      }
    })
    .catch(error => {
      dispatch({
        type: GENERAL_UPDATE_FAILURE,
      });
      toast.error(error);
    });
};

export const getGeneralInfo = () => dispatch => {
  dispatch({
    type: GENERAL_REQUEST,
  });

  return api
    .getGeneralInfo()
    .then(data => {
      console.log(data, generalSchema(data));
      if (data) {
        dispatch({
          type: GENERAL_SUCCESS,
          payload: generalSchema(data),
        });
      }
    })
    .catch(error => {
      dispatch({
        type: GENERAL_FAILURE,
      });
      toast.error(error);
    });
};
