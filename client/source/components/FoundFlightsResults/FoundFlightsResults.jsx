import React from 'react';
import { Segment, List, Statistic, Label, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import uuid from 'uuid';
import moment from 'moment';

import './FoundFlightsResults.scss';

class FoundFlightsResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flightsList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.flights.get('rev') != this.props.flights.get('rev')) {
            this.setState({
                flightsList: nextProps.flights.get('flightsList')
            })
        }
    }

    renderRoutesList(routesList) {
        return routesList.map(route => {
            return(
                <List.Item key={uuid()}>
                    <List.Content floated='left' verticalAlign='middle'>
                        <Label className='label-airline' basic content={`${route.get('airline')} ${route.get('flight_no')}`} horizontal/>
                        <Label color="blue" className='label-city' basic content={route.get('cityFrom')} horizontal/>
                        <Label basic content={moment.unix(route.get('dTime')).format('DD.MM HH:mm')} horizontal/>
                        <Icon name='long arrow right' size='small' />
                        <Label color="blue" className='label-city' basic content={route.get('cityTo')} horizontal/>
                        <Label basic content={moment.unix(route.get('aTime')).format('DD.MM HH:mm')} horizontal/>
                    </List.Content>
                </List.Item>
            );
        });
    }

    renderFlightsList() {
        return this.props.flights.get('flightsList').map(flight => {
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

    render() {
        return(
            <Segment>
                <List divided relaxed>
                    {this.renderFlightsList()}
                </List>
            </Segment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        localization: state.getIn(['localization', 'localizationData', 'foundFlightsResults']) ? state.getIn(['localization', 'localizationData', 'foundFlightsResults']) : Immutable.Map(),
        flights: state.get('flights') ? state.get('flights') : Immutable.Map()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoundFlightsResults);
