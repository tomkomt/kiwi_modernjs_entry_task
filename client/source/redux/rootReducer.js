import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import localization from './localization/reducers';
import arrivalAirports from './airports/arrivalAirports/reducers';
import departureAirports from './airports/departureAirports/reducers';
import flights from './flights/reducers';

module.exports = combineReducers({
    localization,
    arrivalAirports,
    departureAirports,
    flights
}, Immutable.Map());