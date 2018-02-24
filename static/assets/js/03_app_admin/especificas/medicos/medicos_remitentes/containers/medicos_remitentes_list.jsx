import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import {Titulo} from "../../../../../00_utilities/templates/fragmentos";
import BloqueTabMedicosRemitentes from '../components/medicos_remitentes_bloque';
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import {MEDICOS_REMITENTES as medicos_remitentes_permisos} from "../../../../../00_utilities/permisos/types";

class ListadoElementos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
        this.elemento_plural = 'Examenes';
        this.elemento_singular = 'Examen';
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
        this.props.clearMedicosRemitentes();
    }

    cargarDatos() {
        this.props.cargando();
        const cargarEspecialidades = () => this.props.fetchEspecialidades(() => this.props.noCargando(), this.error_callback);
        const cargarMedicosRemitentes = () => this.props.fetchMedicosRemitentes(cargarEspecialidades, this.error_callback);
        this.props.fetchMisPermisos(cargarMedicosRemitentes, this.error_callback)
    }

    render() {
        const {especialidades_list, medicos_remitentes_list, mis_permisos} = this.props;
        const permisos = permisosAdapter(mis_permisos, medicos_remitentes_permisos);
        return (
            <ValidarPermisos can_see={permisos.list} nombre='Médicos Remitentes'>
                <Titulo>{`Médicos Remitentes`}</Titulo>
                <BloqueTabMedicosRemitentes {...this.props} list={medicos_remitentes_list}
                                            especialidades_list={especialidades_list} mis_permisos={mis_permisos}/>
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
        especialidades_list: state.especialidades,
        medicos_remitentes_list: state.medicos_remitentes

    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)