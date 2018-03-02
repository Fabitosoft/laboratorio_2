import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loading from '../00_utilities/components/system/loading_overlay';

import Menu from './00_menu/index';

import App1 from "./index";
import PermisosList from "./generales/permisos/containers/permisos_list";
import GruposPermisosList from "./generales/permisos/containers/grupos_permisos_list";
import UsuariosList from "./generales/usuarios/usuarios/containers/usuarios_list_container";
import UsuariosDetail from "./generales/usuarios/usuarios/containers/usuarios_detail";

import DashboardExamenes from "./especificas/examenes/dashboard/containers/examenes_dashboard";

import EspecialidadesList from "./especificas/medicos/especialidades/containers/especialidades_list";
import MedicosRemitentesList from "./especificas/medicos/medicos_remitentes/containers/medicos_remitentes_list";

import EntidadesList from "./especificas/entidades/entidades/containers/entidades_list_container";
import EntidadesDetail from "./especificas/entidades/entidades/containers/entidad_detail";


import PacientesList from "./especificas/pacientes/pacientes/containers/pacientes_list";
import EspecialistasList from "./especificas/medicos/especialistas/containers/especialistas_list";

const AdminApp = (props) => {
    return (
        <Loading>
            <Fragment>
                <Menu/>
                <div className="p-3">
                    <Switch>
                        <Route exact path='/app/admin/' component={App1}/>
                        <Route exact path='/app/admin/permisos/list' component={PermisosList}/>
                        <Route exact path='/app/admin/grupos_permisos/list' component={GruposPermisosList}/>
                        <Route exact path='/app/admin/usuarios/list' component={UsuariosList}/>
                        <Route exact path='/app/admin/usuarios/detail/:id' component={UsuariosDetail}/>

                        <Route exact path='/app/admin/examenes/list' component={DashboardExamenes}/>

                        <Route exact path='/app/admin/medicos/especialidades/list' component={EspecialidadesList}/>
                        <Route exact path='/app/admin/medicos/medicos_remitentes/list'
                               component={MedicosRemitentesList}/>
                        <Route exact path='/app/admin/entidades/entidades/list'
                               component={EntidadesList}/>
                        <Route exact path='/app/admin/entidades/entidades/detail/:id'
                               component={EntidadesDetail}/>
                        <Route exact path='/app/admin/pacientes/pacientes/list'
                               component={PacientesList}/>
                        <Route exact path='/app/admin/medicos/especialistas/list'
                               component={EspecialistasList}/>
                    </Switch>
                </div>
            </Fragment>
        </Loading>
    )
};

export default AdminApp;