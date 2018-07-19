import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import {Titulo} from "../../../../../00_utilities/templates/fragmentos";
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    ESPECIALIDADES as bloque_1_permisos,
    MEDICOS_REMITENTES as bloque_2_permisos,
    ESPECIALISTAS as bloque_3_permisos,
} from "../../../../../00_utilities/permisos/types";

import BloqueMedicoRemitente from '../../medicos_remitentes/components/medicos_remitentes_list';
import BloqueEspecialidad from '../../especialidades/components/especialidades_list';
import BloqueEspecialistas from '../../medicos_especialistas/components/medicos_especialistas_list';

class ListadoElementos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
        this.plural_name = 'Medicos Gestión';
        this.singular_name = 'Gestión Medico';
        this.cargarDatos = this.cargarDatos.bind(this);

    }

    handleChange = (event, value) => {
        this.setState({
            slideIndex: value,
        });
    };

    componentDidMount() {
        this.cargarDatos();
    }


    componentWillUnmount() {
        this.props.clearEspecialidades();
        this.props.clearMedicosRemitentes();
        this.props.clearEspecialistas();
    }

    cargarDatos() {
        const {notificarErrorAjaxAction, cargando, noCargando} = this.props;
        cargando();
        const cargarBloques3 = () => this.props.fetchMedicosRemitentes(() => noCargando(), notificarErrorAjaxAction);
        const cargarBloques2 = () => this.props.fetchEspecialistas(cargarBloques3, notificarErrorAjaxAction);
        const cargarBloques1 = () => this.props.fetchEspecialidades(cargarBloques2, notificarErrorAjaxAction);
        this.props.fetchMisPermisos(cargarBloques1, notificarErrorAjaxAction)
    }

    render() {
        const {bloque_1_list, bloque_2_list, bloque_3_list, mis_permisos} = this.props;
        const permisos_object_1 = permisosAdapter(mis_permisos, bloque_1_permisos);
        const permisos_object_2 = permisosAdapter(mis_permisos, bloque_2_permisos);
        const permisos_object_3 = permisosAdapter(mis_permisos, bloque_3_permisos);

        const can_see =
            permisos_object_1.list ||
            permisos_object_2.list ||
            permisos_object_3.list;
        return (
            <ValidarPermisos can_see={can_see} nombre={this.plural_name}>
                <Titulo>{this.singular_name}</Titulo>

                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Especialidades" value={0}/>
                    <Tab label="Médicos Remitentes" value={1}/>
                    <Tab label="Médicos Especialistas" value={2}/>
                </Tabs>

                {
                    this.state.slideIndex === 0 &&
                    <BloqueEspecialidad
                        object_list={bloque_1_list}
                        permisos_object={permisos_object_1}
                        {...this.props}
                    />
                }
                {
                    this.state.slideIndex === 1 &&
                    <BloqueMedicoRemitente
                        object_list={bloque_2_list}
                        permisos_object={permisos_object_2}
                        {...this.props}
                        especialidades_list={bloque_1_list}
                    />
                }
                {
                    this.state.slideIndex === 2 &&
                    <BloqueEspecialistas
                        object_list={bloque_3_list}
                        permisos_object={permisos_object_3}
                        {...this.props}
                        especialidades_list={bloque_1_list}
                    />
                }

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
        bloque_1_list: state.especialidades,
        bloque_2_list: state.medicos_remitentes,
        bloque_3_list: state.especialistas,
    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)