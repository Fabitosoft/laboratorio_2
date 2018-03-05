import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../01_actions/01_index";
import CargarDatos from "../../../../00_utilities/components/system/cargar_datos";
import {
    ORDENES as permisos_view
} from "../../../../00_utilities/permisos/types";
import {permisosAdapter} from "../../../../00_utilities/common";

import ListCrud from '../components/ordenes_list';


class List extends Component {
    constructor(props) {
        super(props);
        this.cargarDatos = this.cargarDatos.bind(this);
    }

    componentDidMount() {
        this.cargarDatos();
    }

    componentWillUnmount() {
        this.props.clearOrdenes();
    }

    cargarDatos() {
        const {cargando, noCargando, notificarErrorAjaxAction} = this.props;
        cargando();
        const cargarOrdenes = () => this.props.fetchOrdenes(() => noCargando(), notificarErrorAjaxAction);
        this.props.fetchMisPermisos(cargarOrdenes(), notificarErrorAjaxAction)

    }

    render() {
        const {
            mis_permisos
        } = this.props;
        const bloque_1_list = permisosAdapter(mis_permisos, permisos_view);
        return (
            <Fragment>
                <ListCrud
                    permisos_object={bloque_1_list}
                    {...this.props}
                />
                <CargarDatos
                    cargarDatos={this.cargarDatos}
                />
            </Fragment>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        mis_permisos: state.mis_permisos,
        object_list: state.ordenes,
        pacientes_list: state.pacientes,
        medicos_remitentes_list: state.medicos_remitentes,
        entidades_list: state.entidades
    }
}

export default connect(mapPropsToState, actions)(List)