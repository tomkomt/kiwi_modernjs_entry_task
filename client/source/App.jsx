import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import './reset.css';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';


const history = createBrowserHistory();

class App extends React.Component {
    render() {
        return(
            <div className="app-container">
            </div>
        )
    }
}

export default App;
