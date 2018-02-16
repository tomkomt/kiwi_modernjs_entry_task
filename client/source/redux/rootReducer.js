import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import localization from './localization/reducers';
import arrivalAirports from './airports/arrivalAirports/reducers';
import departureAirports from './airports/departureAirports/reducers';
import flights from './flights/reducers';
import airlines from './airlines/reducers';
import eventsEmitter from './eventsEmitter/reducers';

module.exports = combineReducers({
    localization,
    arrivalAirports,
    departureAirports,
    flights,
    airlines,
    eventsEmitter
}, Immutable.Map());