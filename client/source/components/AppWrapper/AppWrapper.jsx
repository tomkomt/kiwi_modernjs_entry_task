import React from 'react';
import { connect } from 'react-redux';
import { loadLocalization } from '../../redux/localization/actions';

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadLocalization('en-US');
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        localization: state.get('localization')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLocalization: (localizationCode) => {
            dispatch(loadLocalization(localizationCode));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);