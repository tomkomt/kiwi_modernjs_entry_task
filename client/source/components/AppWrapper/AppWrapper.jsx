import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { loadLocalization } from '../../redux/localization/actions';
import { requestAirlinesList } from '../../redux/airlines/actions';
import SearchForm from '../SearchForm/SearchForm';
import FoundFlightsResults from '../FoundFlightsResults/FoundFlightsResults';

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locale: 'en-US'
        }
    }

    componentDidMount() {
        this.props.loadLocalization(this.state.locale);
        this.props.requestAirlinesList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.localization.get('rev') != this.props.localization.get('rev')) {
            if(nextProps.localization.get('success') == false) {
                console.error(new Error('Localization file was not found!'))
            }
        }
    }

    render() {
        return(
            <div className="app-container">
                <SearchForm {...this.state} />
                <FoundFlightsResults {...this.state} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        localization: state.get('localization') ? state.get('localization') : Immutable.Map()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLocalization: (localizationCode) => {
            dispatch(loadLocalization(localizationCode));
        },
        requestAirlinesList: () => {
            dispatch(requestAirlinesList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);