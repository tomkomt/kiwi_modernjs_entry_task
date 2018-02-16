import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import localization from './localization/reducers';
import arrivalAirports from './airports/arrivalAirports/reducers';
import departureAirports from './airports/departureAirports/reducers';

module.exports = combineReducers({
    localization,
    arrivalAirports,
    departureAirports
}, Immutable.Map());