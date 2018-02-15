import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';

import rootReducer from './rootReducer';

const initialState = Immutable.Map();
const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;
