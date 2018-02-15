import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { loadLocalization } from '../../redux/localization/actions';
import { requestLoadAirports } from '../../redux/airports/actions';
import SearchForm from '../SearchForm/SearchForm';

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadLocalization('en-US');
        this.props.requestLoadAirports('en-US');
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
                <SearchForm/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        localization: state.get('localization') ? state.get('localization') : Immutable.Map(),
        airports: state.get('airports') ? state.get('airports') : Immutable.Map()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLocalization: (localizationCode) => {
            dispatch(loadLocalization(localizationCode));
        },
        requestLoadAirports: (localizationCode) => {
            dispatch(requestLoadAirports(localizationCode));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);