import React from 'react';
import { Segment, Header, Form, Grid, Dropdown, Button, Icon, Flag } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fromDestination: '',
            toDestination: '',
            whenTime: moment(),
            destinationList: [{
                key: 0,
                text: 'Loading',
                value: 0
            }]
        }

        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.airports.get('rev') != this.props.airports.get('rev')) {
            this.setState({
                destinationList: nextProps.airports.get('airportsList').map(airport => {
                    return {
                        key: airport.get('id'),
                        text: `${airport.get('city')} (${airport.get('code')})`,
                        value: airport.get('id')
                    }
                }).toJS()
            })
        }
    }

    handleFromChange(e, { newValue }) {
        this.setState({
            fromDestination: newValue
        })
    }

    handleToChange(e, { newValue }) {
        this.setState({
            toDestination: newValue
        })
    }

    handleDatePickerChange(newTime) {
        this.setState({
            whenTime: newTime
        })
    }

    handleSubmitForm() {
    }

    render() {
        return(
            <Segment>
                <Form onSubmit={this.handleSubmitForm}> 
                    <Grid columns={4}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label>{this.props.localization.get('fieldFromText')}</label>
                                    <Dropdown options={this.state.destinationList} value={this.state.fromDestination} placeholder={this.props.localization.get('fieldFromPlaceholder')} search selection fluid onChange={this.handleFromChange} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label>{this.props.localization.get('fieldToText')}</label>
                                    <Dropdown options={this.state.destinationList} value={this.state.toDestination} placeholder={this.props.localization.get('fieldToPlaceholder')} search selection fluid onChange={this.handleToChange} />
                                </Form.Field>
                            </Grid.Column>  
                            <Grid.Column>
                                <Form.Field>
                                    <label>{this.props.localization.get('fieldWhenText')}</label>
                                    <DatePicker
                                        onChange={this.handleDatePickerChange}
                                        selected={this.state.whenTime}
                                        timeIntervals={1}
                                        dateFormat="D.M. YYYY"
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Button type='submit' icon primary labelPosition='right'>{this.props.localization.get('submitButtonText')} <Icon name='search' /></Button>
                                </Form.Field>
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
        airports: state.get('airports') ? state.get('airports') : Immutable.Map()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
