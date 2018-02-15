import { LOAD_LOCALIZATION } from './actions';
import uuid from 'uuid';
import Immutable from 'immutable';

const INIT_STATE = {
    rev: uuid(),
    success: false,
    localizationData: null
};

const localization = (state = Immutable.Map(INIT_STATE), action) => {
    switch(action.type) {
        case LOAD_LOCALIZATION:
            return Immutable.Map({
                rev: uuid(),
                success: action.success,
                localizationData: action.localizationData
            })
        break;

        default:
            return state;
        break;
    }
};

export default localization;
