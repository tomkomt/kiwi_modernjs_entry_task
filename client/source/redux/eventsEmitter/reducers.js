import { EMIT_EVENT } from './actions';
import uuid from 'uuid';
import Immutable from 'immutable';

const INIT_STATE = {
    rev: uuid(),
    event: null
};

const eventsEmitter = (state = Immutable.fromJS(INIT_STATE), action) => {
    switch(action.type) {
        case EMIT_EVENT:
            return Immutable.fromJS({
                rev: uuid(),
                event: action.event
            })
        break;

        default:
            return state;
        break;
    }
};

export default eventsEmitter;
