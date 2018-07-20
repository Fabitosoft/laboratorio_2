import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {Titulo, SinObjeto} from "../../../../../00_utilities/templates/fragmentos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import {
    ENTIDADES as permisos_view,
    CONTACTOS_ENTIDADES as bloque_1_permisos,
    ENTIDADES_EXAMENES as bloque_2_permisos
} from "../../../../../00_utilities/permisos/types";

import BloqueContactos from '../../contactos/components/contacto_entidad_list';
import BloqueEntidadExamenes from '../../examenes/components/entidad_examenes_list';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class EntidadDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
        this.cargarDatos = this.cargarDatos.bind(this);
        this.error_callback = this.error_callback.bind(this);
        this.notificar = this.notificar.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = (event, value) => {
        this.setState({
            slideIndex: value,
        });
    };

    error_callback(error) {
        this.props.notificarErrorAjaxAction(error);
    }

    notificar(mensaje) {
        this.props.notificarAction(mensaje);
    }

    componentDidMount() {
        this.cargarDatos();
    }

    componentWillUnmount() {
        this.props.clearEntidades();
        this.props.clearExamenes();
    }

    cargarDatos() {
        const {id} = this.props.match.params;
        const {noCargando, cargando} = this.props;
        cargando();
        const cargarContactos = () => this.props.fetchContactosEntidades_por_entidad(id, () => noCargando(), this.error_callback);
        const cargarExamenesEntidad = () => this.props.fetchEntidadesExamenes_por_entidad(id, cargarContactos, this.error_callback);
        const cargarExamenes = () => this.props.fetchExamenes(id, cargarExamenesEntidad, this.error_callback);
        const cargarEntidad = () => this.props.fetchEntidad(id, cargarExamenes, this.error_callback);
        this.props.fetchMisPermisos(cargarEntidad, this.error_callback);

    }

    render() {
        const {entidad, mis_permisos, examenes, contactos_entidades, entidad_examenes} = this.props;
        const permisos = permisosAdapter(mis_permisos, permisos_view);
        const permisos_bloque_1 = permisosAdapter(mis_permisos, bloque_1_permisos);
        const permisos_bloque_2 = permisosAdapter(mis_permisos, bloque_2_permisos);

        if (!entidad) {
            return <SinObjeto/>
        }
        return (
            <ValidarPermisos can_see={permisos.detail} nombre='detalle entidad'>
                <Titulo>Detalle {entidad.nombre}</Titulo>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Contactos" value={0}/>
                    <Tab label="Examenes" value={1}/>
                </Tabs>

                {
                    this.state.slideIndex === 0 &&
                    <BloqueContactos
                        object_list={_.map(contactos_entidades, e => e)}
                        permisos_object={permisos_bloque_1}
                        {...this.props}
                    />
                }
                {
                    this.state.slideIndex === 1 &&
                    <BloqueEntidadExamenes
                        permisos_object={permisos_bloque_2}
                        object_list={_.map(entidad_examenes, e => e)}
                        examenes_list={examenes}
                        {...this.props}
                    />
                }

                <CargarDatos cargarDatos={this.cargarDatos}/>
            </ValidarPermisos>
        )
    }

}

function mapPropsToState(state, ownProps) {
    const {id} = ownProps.match.params;
    return {
        entidad: state.entidades[id],
        mis_permisos: state.mis_permisos,
        examenes: state.examenes,
        contactos_entidades: state.contactos_entidades,
        entidad_examenes: state.entidad_examenes,
    }
}

export default connect(mapPropsToState, actions)(EntidadDetail)