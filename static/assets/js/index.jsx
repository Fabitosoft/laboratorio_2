import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './02_reducers/index';
import {Notify} from 'react-redux-notify';

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

import AppIndex from './IndexApp';
import AppAdmin from './03_app_admin/App';


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <BrowserRouter>
                <Fragment>
                    <Notify/>
                    <Switch>
                        <Route exact path='/' component={AppIndex}/>
                        <Route exact path='/app' component={AppIndex}/>
                        <Route path='/app/admin' component={AppAdmin}/>
                    </Switch>
                </Fragment>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
    , document.querySelector('.app')
);