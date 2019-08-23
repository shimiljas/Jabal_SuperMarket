import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import themeReducer from './reducers/themeReducer';
import sidebarReducer from './reducers/sidebarReducer';
import Loginreducer from '../containers/LogIn/Loginreducer';

const rootRducer = combineReducers({
  theme: themeReducer,
  sidebar: sidebarReducer,
  login: Loginreducer,
  form: formReducer,
});

export default rootRducer;
