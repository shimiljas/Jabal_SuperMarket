/* eslint-disable arrow-parens */
/* eslint-disable import/prefer-default-export */
import Messages from '../constant/Messages';

export const errorIterator = error => {
  let message = Messages.SOMETHING_WENT_WRONG;
  let errorObject = null;
  if (error && error.response && error.response.data) {
    errorObject = error.response.data;
  } else if (error && error.data) {
    errorObject = error.data;
  }
  // Assigned Error Object. Start Checking for error messages
  if (errorObject) {
    if (errorObject.message) {
      // eslint-disable-next-line prefer-destructuring
      message = errorObject.message;
    } else if (errorObject.data) {
      message = errorObject.data;
    }
  }
  return message;
};
