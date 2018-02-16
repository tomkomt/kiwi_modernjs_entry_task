import { 
    RECEIVE_LOAD_AIRPORTS,
    RECEIVE_LOAD_ARRIVAL_AIRPORTS 
} from '../actions';
import uuid from 'uuid';
import Immutable from 'immutable';

const INIT_STATE = {
    rev: uuid(),
    airportsList: null
};

const arrivalAirports = (state = Immutable.fromJS(INIT_STATE), action) => {
    switch(action.type) {
        case RECEIVE_LOAD_AIRPORTS:
        case RECEIVE_LOAD_ARRIVAL_AIRPORTS:
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

export default arrivalAirports;
