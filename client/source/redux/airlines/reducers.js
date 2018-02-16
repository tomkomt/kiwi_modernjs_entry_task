import { 
    RECEIVE_AIRLINES_LIST 
} from './actions';
import uuid from 'uuid';
import Immutable from 'immutable';

const INIT_STATE = {
    rev: uuid(),
    airlinesList: []
};

const airlines = (state = Immutable.fromJS(INIT_STATE), action) => {
    switch(action.type) {
        case RECEIVE_AIRLINES_LIST:
            return Immutable.fromJS({
                rev: uuid(),
                airlinesList: action.airlinesList
            })
        break;

        default:
            return state;
        break;
    }
};

export default airlines;
