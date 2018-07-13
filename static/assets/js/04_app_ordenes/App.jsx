import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loading from '../00_utilities/components/system/loading_overlay';

import Menu from './00_menu/index';
import AppIndex from './index';

import OrdenesList from './ordenes/ordenes/containers/ordenes_list_container';
import OrdenDetail from './ordenes/ordenes/containers/orden_detail';
import PacientesList from "../03_app_admin/especificas/pacientes/pacientes/containers/pacientes_list_container";
import MedicosRemitentesList
    from "../03_app_admin/especificas/medicos/dashboard/containers/medicos_dashboard";

const App = (props) => {
    return (
        <Loading>
            <Fragment>
                <Menu/>
                <div className="p-3">
                    <Switch>
                        <Route exact path='/app/ordenes/' component={AppIndex}/>
                        <Route exact path='/app/ordenes/ordenes/list' component={OrdenesList}/>
                        <Route exact path='/app/ordenes/ordenes/detail/:id' component={OrdenDetail}/>
                        <Route exact path='/app/ordenes/pacientes/pacientes/list' component={PacientesList}/>
                        <Route exact path='/app/ordenes/medicos/dashboard'
                               component={MedicosRemitentesList}/>
                    </Switch>
                </div>
            </Fragment>
        </Loading>
    )
};

export default App;