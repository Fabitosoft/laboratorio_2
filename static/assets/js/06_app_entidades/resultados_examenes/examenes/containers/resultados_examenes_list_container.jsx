import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../01_actions/01_index";
import CargarDatos from "../../../../00_utilities/components/system/cargar_datos";
// import {
//     PERMISOS as permisos_view
// } from "../../../../00_utilities/permisos/types";
// import {permisosAdapter} from "../../../../00_utilities/common";
//
import TablaResultados from '../components/resultados_examenes_tabla';


class List extends Component {
    constructor(props) {
        super(props);
        this.cargarDatos = this.cargarDatos.bind(this);
    }

    componentDidMount() {
        this.cargarDatos();
    }

    componentWillUnmount() {
        this.props.clearOrdenesExamenes();
    }

    cargarDatos() {
        const {cargando, noCargando, notificarErrorAjaxAction} = this.props;
        cargando();
        const mi_cuenta = JSON.parse(localStorage.getItem('mi_cuenta'));
        const cargarResultados = () => this.props.fetchOrdenesExamenes_por_entidad(mi_cuenta.mi_entidad, () => noCargando(), notificarErrorAjaxAction);
        this.props.fetchMisPermisos(cargarResultados, notificarErrorAjaxAction)

    }

    render() {
        const {ordenes_examenes} = this.props;
        return (
            <Fragment>
                <h4>Examenes y Resultados</h4>
                <TablaResultados data={ordenes_examenes}/>
                <CargarDatos
                    cargarDatos={this.cargarDatos}
                />
            </Fragment>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        ordenes_examenes: state.ordenes_examenes,
    }
}

export default connect(mapPropsToState, actions)(List)