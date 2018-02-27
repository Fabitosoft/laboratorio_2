import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import {Titulo} from "../../../../../00_utilities/templates/fragmentos";
import BloqueTabEspecialidades from '../components/especialidades_bloque';
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import {ESPECIALIDADES as especialidades_permisos} from "../../../../../00_utilities/permisos/types";


class ListadoElementos extends Component {
    constructor(props) {
        super(props);
        this.cargarDatos = this.cargarDatos.bind(this);
        this.error_callback = this.error_callback.bind(this);

    }

    componentDidMount() {
        this.cargarDatos();
    }

    error_callback(error) {
        this.props.notificarErrorAjaxAction(error);
    }

    componentWillUnmount() {
        this.props.clearEspecialidades();
    }

    cargarDatos() {
        this.props.cargando();
        const cargarEspecialidades = () => this.props.fetchEspecialidades(() => this.props.noCargando(), this.error_callback);
        this.props.fetchMisPermisos(cargarEspecialidades, this.error_callback)
    }

    render() {
        const {especialidades_list, mis_permisos} = this.props;
        const permisos = permisosAdapter(mis_permisos, especialidades_permisos);
        return (
            <ValidarPermisos can_see={permisos.list} nombre='Especialidades'>
                <Titulo>{`Especialidades`}</Titulo>
                <BloqueTabEspecialidades {...this.props} list={especialidades_list} mis_permisos={mis_permisos}/>
                <CargarDatos
                    cargarDatos={this.cargarDatos}
                />
            </ValidarPermisos>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        mis_permisos: state.mis_permisos,
        especialidades_list: state.especialidades
    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)