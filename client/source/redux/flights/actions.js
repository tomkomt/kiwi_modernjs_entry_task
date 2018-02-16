import Immutable from 'immutable';
var unirest = require('unirest');
import Consts from '../../consts/consts';

var pendingRequest = false;

export const REQUEST_FLIGHTS_SEARCH = 'REQUEST_SIMPLE_FLIGHTS_SEARCH';
export function requestSimpleFlightsSearch(fromAirport, toAirport, dateFrom, dateTo) {
    try {
        if(!pendingRequest) {
            pendingRequest = true;
            return (dispatch) => {
                unirest.get(`${Consts.apiUrl}/flights?flyFrom=${fromAirport}&to=${toAirport}&dateFrom=${dateFrom}&dateTo=${dateTo}&partner=picky&partner_market=us`)
                .end(response => {
                    if(response.error) {
                        console.error(new Error(response.error));
                        dispatch(receiveError());
                    } else {
                        dispatch(receiveSimpleFlightsSearch(response.body.data));
                    }
                });
            };
        } else {
            dispatch(requestAlreadyPending());
        }
    } catch(exception) {
        console.error(new Error(exception));
    }
}

export const RECEIVE_SIMPLE_FLIGHTS_SEARCH = 'RECEIVE_SIMPLE_FLIGHTS_SEARCH';
export function receiveSimpleFlightsSearch(routesList) {
    try {
        pendingRequest = false;
        return {
            type: RECEIVE_SIMPLE_FLIGHTS_SEARCH,
            routesList: routesList
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