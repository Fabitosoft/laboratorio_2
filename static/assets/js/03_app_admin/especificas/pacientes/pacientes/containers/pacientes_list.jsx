import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import {Titulo} from "../../../../../00_utilities/templates/fragmentos";
import BloquePacientes from '../components/pacientes_bloque';
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import {ESPECIALIDADES as permisos_view} from "../../../../../00_utilities/permisos/types";

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
        this.props.clearPacientes();
    }

    cargarDatos() {
        this.props.cargando();
        const cargarPacientes = () => this.props.fetchPacientes(() => this.props.noCargando(), this.error_callback);
        this.props.fetchMisPermisos(cargarPacientes, this.error_callback)
    }

    render() {
        const {pacientes_list, mis_permisos} = this.props;
        const permisos = permisosAdapter(mis_permisos, permisos_view);
        return (
            <ValidarPermisos can_see={permisos.list} nombre='Pacientes'>
                <Titulo>{`Pacientes`}</Titulo>
                <BloquePacientes {...this.props} list={pacientes_list} mis_permisos={mis_permisos}/>
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
        pacientes_list: state.pacientes

    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)