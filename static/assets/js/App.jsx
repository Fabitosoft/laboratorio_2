import React, {Fragment, Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import {connect} from "react-redux";
import thunk from 'redux-thunk';
import reducers from './02_reducers/index';
import {Notify} from 'react-redux-notify';
import * as actions from "./01_actions/01_index";
import NotFound from "./00_utilities/components/system/no_found_page";

import 'react-redux-notify/dist/ReactReduxNotify.css';
import "react-table/react-table.css";
import 'react-widgets/dist/css/react-widgets.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'tether/dist/js/tether';
import 'bootstrap/dist/js/bootstrap';
import 'react-select/dist/react-select.css';
import './../../css/custom.css';


import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
const theme = createMuiTheme();


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore);
const store = configureStore();

function configureStore() {
    const store = createStoreWithMiddleware(reducers);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./02_reducers', () => {
            const nextRootReducer = require('./02_reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}

import AppIndex from './IndexApp';
import AppAdmin from './03_app_admin/App';
import AppOrdenes from './04_app_ordenes/App';
import AppResultados from './05_app_resultados/App';
import AppEntidades from './06_app_entidades/App';
import Login from './authentication/login/containers/login';

class RootContainerComponent extends Component {
    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>;
            } else if (!this.props.auth.isAuthenticated) {
                return <Redirect to="/app/login"/>;
            } else {
                return <ChildComponent {...props} />
            }
        }}/>
    };

    render() {
        let {PrivateRoute} = this;
        const mi_cuenta = JSON.parse(localStorage.getItem("mi_cuenta"));
        return (
            <BrowserRouter>
                <Fragment>
                    <Notify/>
                    <Switch>
                        <PrivateRoute exact path="/" component={AppIndex}/>
                        <PrivateRoute exact path='/app' component={AppIndex}/>
                        <Route path='/app/login' component={Login}/>
                        <Route path='/app/admin' component={AppAdmin}/>
                        <Route path='/app/ordenes' component={AppOrdenes}/>
                        <Route path='/app/resultados' component={AppResultados}/>
                        <Route path='/app/entidades' component={AppEntidades}/>
                        <Route component={NotFound}/>
                    </Switch>
                    <div style={{position: 'fixed', left: 10, bottom: 10}}>
                        {
                            mi_cuenta &&
                            <Fragment>
                                <strong>Usuario: </strong>
                                <small>{mi_cuenta.username}</small>
                            </Fragment>
                        }
                    </div>
                </Fragment>
            </BrowserRouter>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        auth: state.auth,
    }
}

let RootContainer = connect(mapPropsToState, actions)(RootContainerComponent);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <RootContainer/>
                </MuiThemeProvider>
            </Provider>
        )
    }
}