import { 
    RECEIVE_SIMPLE_FLIGHTS_SEARCH 
} from './actions';
import uuid from 'uuid';
import Immutable from 'immutable';

const INIT_STATE = {
    rev: uuid(),
    reqNo: 0,
    flightsList: []
};

const arrivalAirports = (state = Immutable.fromJS(INIT_STATE), action) => {
    switch(action.type) {
        case RECEIVE_SIMPLE_FLIGHTS_SEARCH:
            return Immutable.fromJS({
                rev: uuid(),
                reqNo: state.get('reqNo') + 1,
                flightsList: action.routesList
            })
        break;

        default:
            return state;
        break;
    }
};

export default arrivalAirports;
