import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import localization from './localization/reducers';
import airports from './airports/reducers';

module.exports = combineReducers({
    localization,
    airports
}, Immutable.Map());