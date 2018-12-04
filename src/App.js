import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router';
import createHistory from 'history/createHashHistory';

import {Provider} from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import logger from 'redux-logger'
import rootReducer from './reducers';

import loginScreen from './container/con-login';
import registerScreen from './container/con-register';
import pageNotFindScreen from './container/con-401';
import homeScreen from './container/con-home';
import employeeDatabase from './container/con-employee-database';
import settingVehicleScreen from './container/con-setting-vehicle';
import mediaStreaning from './container/con-media-streaming';

const history = createHistory();
const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={loginScreen}/>
                    <Route path="/login" component={loginScreen}/>
                    <Route path="/register" component={registerScreen}/>
                    <Route path="/home" component={homeScreen}/>
                    <Route path="/employee-database" component={employeeDatabase}/>

                    <Route component={pageNotFindScreen}/>
                </Switch>
            </Router>
            </Provider>

        );
    }
}

export default App;

/*
<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
 */