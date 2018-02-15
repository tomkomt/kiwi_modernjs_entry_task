import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import './reset.css';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

import AppWrapper from './components/AppWrapper/AppWrapper';

class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <AppWrapper/>
            </Provider>
        )
    }
}

export default App;