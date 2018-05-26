import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import NotifyReducer from 'react-redux-notify';
import misPermisosReducer from './generales/permisos/misPermisosReducer';
import otroUsuarioPermisosReducer from './generales/permisos/otroUsarioPermisosReducer';
import gruposPermisosReducer from './generales/permisos/gruposPermisosReducer';
import permisosReducer from './generales/permisos/permisosReducer';
import usuariosReducer from './generales/usuariosReducer';
import loadingReducer from './generales/loadingReducer';
import miCuentaReducer from './generales/miCuentaReducer';


import examenesReducer from './especificas/examenes/examenesReducer';
import cupsGruposReducer from './especificas/examenes/cupsGruposReducer';
import cupsSubGruposReducer from './especificas/examenes/cupsSubGruposReducer';
import especialistasReducer from './especificas/medicos/especialistasReducer';
import especialidadesReducer from './especificas/medicos/especialidadesReducer';
import medicosRemitentesReducer from './especificas/medicos/medicosRemitentesReducer';
import entidadesReducer from './especificas/entidades/entidadesReducer';
import contactosEntidadesReducer from './especificas/entidades/contactosEntidadesReducer';
import entidadExamenesReducer from './especificas/entidades/entidadExamenesReducer';
import pacientesReducer from './especificas/pacientes/pacientesReducer';
import ordenesReducer from './especificas/ordenes/ordenesReducer';
import ordenesExamenReducer from './especificas/ordenes/ordenExamenReducer';
import citologiasExamenReducer from './especificas/examenes_especiales/citilogiasReducer';
import biopsiasExamenReducer from './especificas/examenes_especiales/biopsiasReducer';


const rootReducer = combineReducers({
    mis_permisos: misPermisosReducer,
    permisos: permisosReducer,
    permisos_otro_usuario: otroUsuarioPermisosReducer,
    grupos_permisos: gruposPermisosReducer,
    mi_cuenta: miCuentaReducer,
    usuarios: usuariosReducer,
    esta_cargando: loadingReducer,
    notifications: NotifyReducer,
    form: formReducer,
    examenes: examenesReducer,
    cups_grupos: cupsGruposReducer,
    cups_subgrupos: cupsSubGruposReducer,
    especialistas: especialistasReducer,
    especialidades: especialidadesReducer,
    medicos_remitentes: medicosRemitentesReducer,
    entidades: entidadesReducer,
    contactos_entidades: contactosEntidadesReducer,
    entidad_examenes: entidadExamenesReducer,
    pacientes: pacientesReducer,
    ordenes: ordenesReducer,
    ordenes_examenes: ordenesExamenReducer,
    citologias: citologiasExamenReducer,
    biopsias: biopsiasExamenReducer,
});

export default rootReducer;