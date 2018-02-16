import React from 'react';
import { Segment, List, Statistic, Label, Icon, Pagination } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import uuid from 'uuid';
import moment from 'moment';
import Consts from '../../consts/consts';
import Loader from 'react-loaders';

import './FoundFlightsResults.scss';

class FoundFlightsResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFlightListLoaded: false,
            isFlightListPending: false,
            flightsList: [],
            paginatedFlightsList: [],
            activePage: 1,
            totalPages: 1
        }

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.flights.get('rev') != this.props.flights.get('rev')) {
            this.setState({
                flightsList: nextProps.flights.get('flightsList'),
                paginatedFlightsList: this.paginateData(nextProps.flights.get('flightsList'), 1),
                totalPages: Math.floor(nextProps.flights.get('flightsList').size / Consts.itemsPerFlightsResultsPage),
                isFlightListLoaded: true,
                isFlightListPending: false
            })
        }

        if(nextProps.eventsEmitter.get('rev') != this.props.eventsEmitter.get('rev') && nextProps.eventsEmitter.get('event') == 'searchFormSubmit') {
            this.setState({
                isFlightListLoaded: false,
                isFlightListPending: true
            })
        }
    }

    handlePageChange(e, { activePage }) {
        this.setState({
            activePage: activePage,
            paginatedFlightsList: this.paginateData(this.state.flightsList, activePage)
        })
    }

    paginateData(flightsList, activePage) {
        let firstRow = activePage == 1 ? 0 : ((activePage - 1) * Consts.itemsPerFlightsResultsPage);
        let lastRow = firstRow + (Consts.itemsPerFlightsResultsPage);

        return flightsList.slice(firstRow, lastRow);
    }

    firstPagination() {
        this.setState({
            paginatedFlightsList: this.state.flightsList.slice(0, Consts.itemsPerFlightsResultsPage  - 1)
        })
    }

    renderRoutesList(routesList) {
        return routesList.map(route => {
            let newRoute = route.set('airline_object', this.props.airlines.find(airline => { return airline.get('id') == route.get('airline'); }))
            return(
                <List.Item key={uuid()}>
                    <List.Content floated='left' verticalAlign='middle'>
                        <Label image basic as='div' horizontal>
                            <img className="airline-logo" src={`${Consts.imgUrl}/${newRoute.get('airline')}.png`} />
                            {newRoute.getIn(['airline_object', 'name'])}
                        </Label>
                        <Label color='green' basic content={`${newRoute.get('airline')} ${newRoute.get('flight_no')}`} horizontal/>
                        <Label color="blue" basic content={newRoute.get('cityFrom')} horizontal/>
                        <Label basic content={moment.unix(newRoute.get('dTime')).format('DD.MM HH:mm')} horizontal/>
                        <Icon name='long arrow right' size='small' />
                        <Label color="blue" basic content={newRoute.get('cityTo')} horizontal/>
                        <Label basic content={moment.unix(newRoute.get('aTime')).format('DD.MM HH:mm')} horizontal/>
                    </List.Content>
                </List.Item>
            );
        });
    }

    renderFlightsList() {
        return this.state.paginatedFlightsList.map(flight => {
            return(
                <List.Item key={uuid()}>
                    <List.Content floated='left' verticalAlign='middle'>
                        <List.Icon floated='left' name='plane' size='large' color='blue'/>
                    </List.Content>
                    <List.Content floated='left' verticalAlign='middle'>
                        <Statistic size='mini'>
                            <Statistic.Value>{flight.get('price')} &euro;</Statistic.Value>
                            <Statistic.Label>Price</Statistic.Label>
                        </Statistic>
                    </List.Content>
                    <List.Content floated='left' verticalAlign='middle'>
                        <Statistic size='mini'>
                            <Statistic.Value>{flight.get('fly_duration')}</Statistic.Value>
                            <Statistic.Label>Flight Duration</Statistic.Label>
                        </Statistic>                        
                    </List.Content>
                    <List.Content floated='left' verticalAlign='middle'>
                        <List divided>
                            {this.renderRoutesList(flight.get('route'))}
                        </List>
                    </List.Content>
                </List.Item>
            )
        })
    }

    renderIfReady() {
        return(
            <Segment>
                <List divided relaxed>
                    {this.renderFlightsList()}
                </List>
                <Pagination activePage={this.state.activePage} totalPages={this.state.totalPages} onPageChange={this.handlePageChange} />
            </Segment>
        )
    }

    renderLoading() {
        return(
            <div>
                <div>
                    <Loader type="ball-grid-beat" />
                </div>
                <div style={{ clear: 'both', textAlign: 'center' }}>{this.state.isFlightListPending ? this.props.localization.get('loadingFlightsResults') : this.props.localization.get('waitingForYourInput')}</div>
            </div>
        )
    }

    render() {
        return this.state.isFlightListLoaded ? this.renderIfReady() : this.renderLoading();
    }
}


const mapStateToProps = (state) => {
    return {
        localization: state.getIn(['localization', 'localizationData', 'foundFlightsResults']) ? state.getIn(['localization', 'localizationData', 'foundFlightsResults']) : Immutable.Map(),
        flights: state.get('flights') ? state.get('flights') : Immutable.Map(),
        airlines: state.getIn(['airlines', 'airlinesList']) ? state.getIn(['airlines', 'airlinesList']) : Immutable.List(),
        eventsEmitter: state.get('eventsEmitter') ? state.get('eventsEmitter') : Immutable.Map(),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoundFlightsResults);
