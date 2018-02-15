import Immutable from 'immutable';
var unirest = require('unirest');
import Consts from '../../consts/consts';

var pendingRequest = false;

export const REQUEST_LOAD_AIRPORTS = 'REQUEST_LOAD_AIRPORTS';
export function requestLoadAirports(localizationCode) {
    try {
        if(!pendingRequest) {
            pendingRequest = true;
            return (dispatch) => {
                unirest.get(`${Consts.apiUrl}/locations?type=dump&locale=${localizationCode}&location_types=airport&sort=name&limit=100`)
                .end(response => {
                    if(response.error) {
                        console.error(new Error(response.error));
                        dispatch(receiveError());
                    } else {
                        dispatch(receiveLoadAirports(response.body.locations));
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

export const RECEIVE_LOAD_AIRPORTS = 'RECEIVE_LOAD_AIRPORTS';
export function receiveLoadAirports(airportsList) {
    try {
        pendingRequest = false;
        return {
            type: RECEIVE_LOAD_AIRPORTS,
            airportsList: airportsList.filter(airport => {
                return airport.active;
            }).map(airport => {
                let imAirport = Immutable.fromJS(airport);
                return {
                    id: imAirport.get('id'),
                    int_id: imAirport.get('int_id'),
                    code: imAirport.get('code'),
                    name: imAirport.get('name'),
                    city: imAirport.getIn(['city', 'name']),
                    country_code: imAirport.getIn(['city', 'country', 'code'])
                }
            })
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