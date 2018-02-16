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
const CENTER_OFFSET = 5;
export const REQUEST_LOAD_AIRPORTS_BY_GPS = 'REQUEST_LOAD_AIRPORTS_BY_GPS';
export function requestLoadAirportsByGPS(localizationCode, lat, lon) {
    try {
        if(!pendingRequest) {
            pendingRequest = true;
            return (dispatch) => {
                unirest.get(`${Consts.apiUrl}/locations?type=box&locale=${localizationCode}&low_lat=${lat - CENTER_OFFSET}&high_lat=${lat + CENTER_OFFSET}&low_lon=${lon - CENTER_OFFSET}&high_lon=${lon + CENTER_OFFSET}&location_types=airport&sort=name&limit=9999`)
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

export const REQUEST_LOAD_AIRPORTS_BY_QUERY = 'REQUEST_LOAD_AIRPORTS_BY_QUERY';
export function requestLoadAirportsByQuery(localizationCode, query, preposition) {
    try {
        return (dispatch) => {
            unirest.get(`${Consts.apiUrl}/locations?term=${query}&locale=${localizationCode}&location_types=airport&sort=name&limit=9999`)
            .end(response => {
                if(response.error) {
                    console.error(new Error(response.error));
                    dispatch(receiveError());
                } else {
                    if(preposition == 'departure') {
                        dispatch(receiveLoadDepartureAirports(response.body.locations));
                    } else if(preposition == 'arrival') {
                        dispatch(receiveLoadArrivalAirports(response.body.locations));
                    }
                }
            });
        };
    } catch(exception) {
        console.error(new Error(exception));
    }
}

function processAirportsList(airportsList) {
    return airportsList.filter(airport => {
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
    });
}

export const RECEIVE_LOAD_ARRIVAL_AIRPORTS = 'RECEIVE_LOAD_ARRIVAL_AIRPORTS';
export function receiveLoadArrivalAirports(airportsList) {
    try {
        return {
            type: RECEIVE_LOAD_ARRIVAL_AIRPORTS,
            airportsList: processAirportsList(airportsList)
        }
    } catch(exception) {
        console.error(new Error(exception));        
    }
}

export const RECEIVE_LOAD_DEPARTURE_AIRPORTS = 'RECEIVE_LOAD_DEPARTURE_AIRPORTS';
export function receiveLoadDepartureAirports(airportsList) {
    try {
        return {
            type: RECEIVE_LOAD_DEPARTURE_AIRPORTS,
            airportsList: processAirportsList(airportsList)
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
            airportsList: processAirportsList(airportsList)
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