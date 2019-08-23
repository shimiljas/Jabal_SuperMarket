import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { createBrowserHistory } from 'history';

import rootReducer from '../redux/rootReducer';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [''],
};
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
  initialState,
);

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
  middleware.push(logger);
}

// const composedEnhancers = compose(
//   applyMiddleware(...middleware),
//   ...enhancers,
// );

// const store = createStore(rootReducer, initialState, composedEnhancers);

// export default store;

function configureStore() {
  const enhancer = applyMiddleware(...middleware);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}

const store = configureStore();

export default store;
