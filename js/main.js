import "babel-polyfill"

import React from 'react'
import { render } from 'react-dom'
import { Provider, ReactRedux } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import Counter from './components/Counter'
import 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import { logger } from 'redux-logger';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

const middleware = [epicMiddleware, logger]; 
const enhanced = [
    applyMiddleware(...middleware),
];
const enhancer = compose(...enhanced);
const store = createStore(reducer, {}, enhancer);
 
render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
);
