import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loading from '../00_utilities/components/system/loading_overlay';

import Menu from './00_menu/index';
import AppIndex from './index';

import OrdenesList from './ordenes/ordenes/containers/ordenes_list_container';
import OrdenDetail from './ordenes/ordenes/containers/orden_detail';

const App = (props) => {
    return (
        <Loading>
            <Fragment>
                <Menu/>
                <div className="p-3">
                    <Switch>
                        <Route exact path='/app/laboratorio/' component={AppIndex}/>
                        <Route exact path='/app/laboratorio/ordenes/list' component={OrdenesList}/>
                        <Route exact path='/app/laboratorio/ordenes/detail/:id' component={OrdenDetail}/>
                    </Switch>
                </div>
            </Fragment>
        </Loading>
    )
};

export default App;