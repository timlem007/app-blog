import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const loggerMiddleware = () => (next) => (action) => {
  const result = next(action);
  // console.log("middleware", store.getState(), action);
  return result;
};

const store = createStore(reducer, composeEnhancers(applyMiddleware(
  loggerMiddleware,
  reduxThunk,
)));

export default store;
