import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

function configureStore(initialState) {
  const store = compose(
    _getMiddleware(),
    ..._getEnhancers()
  )(createStore)(rootReducer, initialState);

  _enableHotLoader(store);
  return store;
}

function _getMiddleware() {
  let middleware = [
    routerMiddleware(browserHistory),
    thunk,
  ];


  middleware = [...middleware];

  return applyMiddleware(...middleware);
}

function _getEnhancers() {
  let enhancers = [];

  if (window.devToolsExtension) {
    enhancers = [...enhancers, window.devToolsExtension() ];
  }

  return enhancers;
}

function _enableHotLoader(store) {
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
}


export default configureStore;
