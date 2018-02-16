import React from 'react';
import { Segment, Header, Form, Grid, Dropdown, Button, Icon, Flag } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { requestLoadAirportsByGPS, requestLoadAirportsByQuery } from '../../redux/airports/actions';
import { requestSimpleFlightsSearch } from '../../redux/flights/actions';
import Consts from '../../consts/consts';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDestination: '',
            fromDestinationList: [],
            fromSearchQuery: '',
            toDestination: '',
            toDestinationList: [],
            toSearchQuery: '',
            startDate: moment(),
            endDate: moment().add(3, 'days'),
            gpsCoordinates: {
                lat: 41.385064,
                lon: 2.173403
            },
            noResultsMessage: '...'
        }

        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleFromSearchChange = this.handleFromSearchChange.bind(this);
        this.handleToSearchChange = this.handleToSearchChange.bind(this);
        this.handleDateStartChange = this.handleDateStartChange.bind(this);
        this.handleDateEndChange = this.handleDateEndChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    componentDidMount() {
        this.props.requestLoadAirportsByGPS(this.props.locale, this.state.gpsCoordinates.lat, this.state.gpsCoordinates.lon)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.arrivalAirports.get('rev') != nextProps.arrivalAirports.get('rev')) {
            this.setState({
                toDestinationList: this.mapAirportDropdownContent(nextProps.arrivalAirports.get('airportsList')),
                noResultsMessage: this.props.localization.get('fieldDropdownNoResultsMessage_noResult')
            })            
        }

        if(this.props.departureAirports.get('rev') != nextProps.departureAirports.get('rev')) {
            this.setState({
                fromDestinationList: this.mapAirportDropdownContent(nextProps.departureAirports.get('airportsList')),
                noResultsMessage: this.props.localization.get('fieldDropdownNoResultsMessage_noResult')
            })            
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.fromDestination != this.state.fromDestination) {
            this.handleSubmitForm();
        }

        if(prevState.toDestination != this.state.toDestination) {
            this.handleSubmitForm();
        }

        if(prevState.startDate.valueOf() != this.state.startDate.valueOf()) {
            this.handleSubmitForm();
        }

        if(prevState.endDate.valueOf() != this.state.endDate.valueOf()) {
            this.handleSubmitForm();
        }
    }

    mapAirportDropdownContent(airportsList) {
        return airportsList.map(airport => {
            return {
                key: airport.get('id'),
                text: `${airport.get('city')} (${airport.get('code')})`,
                value: airport.get('id')
            }
        }).toJS();
    }

    handleFromChange(e, { value }) {
        this.setState({
            fromDestination: value
        });
    }

    handleFromSearchChange(e, { searchQuery }) {
        if(this.state.fromSearchQuery.length < searchQuery) {
            let filteredList = this.state.fromDestinationList.filter(airport => {
                return airport.value.indexOf(searchQuery) > -1 || airport.text.indexOf(searchQuery) > -1;
            });
            if(filteredList.length > 0) {
                this.setState({
                    fromDestinationList: filteredList,
                    fromSearchQuery: searchQuery
                });
            } else {
                this.props.requestLoadAirportsByQuery(this.props.locale, searchQuery, 'departure');
            }
        } else {
            this.setState({
                fromSearchQuery: searchQuery,
                noResultsMessage: this.props.localization.get('fieldDropdownNoResultsMessage_loading')
            });
            this.props.requestLoadAirportsByQuery(this.props.locale, searchQuery, 'departure');
        }
    }

    handleToChange(e, { value }) {
        this.setState({
            toDestination: value
        }); 
    }

    handleToSearchChange(e, { searchQuery }) {
        if(this.state.toSearchQuery.length < searchQuery) {
            let filteredList = this.state.toDestination.filter(airport => {
                return airport.value.indexOf(searchQuery) > -1 || airport.text.indexOf(searchQuery) > -1;
            });
            if(filteredList.length > 0) {
                this.setState({
                    toDestination: filteredList,
                    toSearchQuery: searchQuery
                });
            } else {
                this.props.requestLoadAirportsByQuery(this.props.locale, searchQuery, 'arrival');
            }
        } else {
            this.setState({
                toSearchQuery: searchQuery,
                noResultsMessage: this.props.localization.get('fieldDropdownNoResultsMessage_loading')
            });
            this.props.requestLoadAirportsByQuery(this.props.locale, searchQuery, 'arrival');
        }
    }

    handleDateStartChange(newTime) {
        this.setState({
            startDate: newTime
        });
    }

    handleDateEndChange(newTime) {
        this.setState({
            endDate: newTime
        });
    }

    handleSubmitForm() {
        this.props.requestSimpleFlightsSearch(
            this.state.fromDestination,
            this.state.toDestination,
            this.state.startDate.format(Consts.dateFormats.flightsRequestFormat),
            this.state.endDate.format(Consts.dateFormats.flightsRequestFormat)
        )
    }

    render() {
        return(
            <Segment>
                <Form onSubmit={this.handleSubmitForm}> 
                    <Grid columns={5}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label>{this.props.localization.get('fieldFromText')}</label>
                                    <Dropdown 
                                        options={this.state.fromDestinationList} 
                                        value={this.state.fromDestination} 
                                        placeholder={this.props.localization.get('fieldFromPlaceholder')} 
                                        search 
                                        selection 
                                        fluid 
                                        onChange={this.handleFromChange} 
                                        onSearchChange={this.handleFromSearchChange} 
                                        noResultsMessage={this.state.noResultsMessage}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label>{this.props.localization.get('fieldToText')}</label>
                                    <Dropdown 
                                        options={this.state.toDestinationList} 
                                        value={this.state.toDestination} 
                                        placeholder={this.props.localization.get('fieldToPlaceholder')} 
                                        search 
                                        selection 
                                        fluid 
                                        onChange={this.handleToChange} 
                                        onSearchChange={this.handleToSearchChange}
                                        noResultsMessage={this.state.noResultsMessage}
                                    />
                                </Form.Field>
                            </Grid.Column>  
                            <Grid.Column>
                                <Form.Field>
                                    <label>{this.props.localization.get('fieldWhenStartText')}</label>
                                    <DatePicker
                                        selectsStart
                                        onChange={this.handleDateStartChange}
                                        selected={this.state.startDate}
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        dateFormat={Consts.dateFormats.searchFormFormat}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label>{this.props.localization.get('fieldWhenEndText')}</label>
                                    <DatePicker
                                        selectsEnd
                                        onChange={this.handleDateEndChange}
                                        selected={this.state.endDate}
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        dateFormat={Consts.dateFormats.searchFormFormat}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>                            
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        localization: state.getIn(['localization', 'localizationData', 'searchForm']) ? state.getIn(['localization', 'localizationData', 'searchForm']) : Immutable.Map(),
        arrivalAirports: state.get('arrivalAirports') ? state.get('arrivalAirports') : Immutable.Map(),
        departureAirports: state.get('departureAirports') ? state.get('departureAirports') : Immutable.Map(),
        flights: state.get('flights') ? state.get('flights') : Immutable.Map()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestLoadAirportsByGPS: (localizationCode, lat, lon) => {
            dispatch(requestLoadAirportsByGPS(localizationCode, lat, lon))
        },
        requestLoadAirportsByQuery: (localizationCode, query, preposition) => {
            dispatch(requestLoadAirportsByQuery(localizationCode, query, preposition))
        },
        requestSimpleFlightsSearch: (from, to, dateFrom, dateTo) => {
            dispatch(requestSimpleFlightsSearch(from, to, dateFrom, dateTo))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
