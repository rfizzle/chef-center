import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import isPlainObject from 'react-redux/es/utils/isPlainObject';
import history from '../../routers/history';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export function getDefaultMiddleware(isProduction = IS_PRODUCTION) {
  let middlewareArray = [thunk];

  if (!isProduction) {
    middlewareArray = [
      thunk,
      routerMiddleware(history)
    ];
  }

  return middlewareArray;
}

export default function configureStore(options = {}) {
  const {
    reducer,
    middleware = getDefaultMiddleware(),
    devTools = true,
    preloadedState,
    enhancers = []
  } = options;

  let rootReducer;

  if (typeof reducer === 'function') {
    rootReducer = reducer;
  } else if (isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer);
  } else {
    throw new Error(
      'Reducer argument must be a function or an object of functions that can be passed to combineReducers'
    );
  }

  const middlewareEnhancer = applyMiddleware(...middleware);

  let finalCompose = compose;

  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: !IS_PRODUCTION
    });
  }

  const storeEnhancers = [middlewareEnhancer, ...enhancers];

  const composedEnhancer = finalCompose(...storeEnhancers);

  return createStore(rootReducer, preloadedState, composedEnhancer);
}