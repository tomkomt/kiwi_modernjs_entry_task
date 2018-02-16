import Immutable from 'immutable';
var unirest = require('unirest');
import Consts from '../../consts/consts';

var pendingRequest = false;

export function requestAirlinesList() {
    return (dispatch) => {
        try {
            if(!pendingRequest) {
                pendingRequest = true;
                    unirest.get(`${Consts.apiUrl}/airlines`)
                    .end(response => {
                        if(response.error) {
                            console.error(new Error(response.error));
                            dispatch(receiveError());
                        } else {
                            dispatch(receiveAirlinesList(response.body));
                        }
                    });
            } else {
                dispatch(requestAlreadyPending());
            }
        } catch(exception) {
            console.error(new Error(exception));
            dispatch(receiveError());
        }
    };
}

export const RECEIVE_AIRLINES_LIST = 'RECEIVE_AIRLINES_LIST';
export function receiveAirlinesList(airlinesList) {
    try {
        pendingRequest = false;
        return {
            type: RECEIVE_AIRLINES_LIST,
            airlinesList: airlinesList
        }
    } catch(exception) {
        console.error(new Error(exception));        
    }
}

function requestAlreadyPending() {
    pendingRequest = false;
    return {
        type: 'REQUEST_ALREADY_PENDING'
    };
}

function receiveError() {
    pendingRequest = false;
    return {
        type: 'ERROR_RECEIVED'
    };
}