import { 
    RECEIVE_LOAD_AIRPORTS,
    RECEIVE_LOAD_DEPARTURE_AIRPORTS 
} from '../actions';
import uuid from 'uuid';
import Immutable from 'immutable';

const INIT_STATE = {
    rev: uuid(),
    airportsList: null
};

const departureAirports = (state = Immutable.fromJS(INIT_STATE), action) => {
    switch(action.type) {
        case RECEIVE_LOAD_AIRPORTS:
        case RECEIVE_LOAD_DEPARTURE_AIRPORTS:
            return Immutable.fromJS({
                rev: uuid(),
                airportsList: action.airportsList
            })
        break;

        default:
            return state;
        break;
    }
};

export default departureAirports;
