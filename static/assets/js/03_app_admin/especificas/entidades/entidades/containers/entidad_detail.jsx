import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {Titulo, SinObjeto} from "../../../../../00_utilities/templates/fragmentos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import {
    ENTIDADES as permisos_view
} from "../../../../../00_utilities/permisos/types";

import BloqueContactos from '../../../entidades/contactos/components/contactos_bloque';
import BloqueEntidadExamenes from '../../../entidades/examenes/components/entidad_examenes_bloque';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

class EntidadDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
        this.cargarDatos = this.cargarDatos.bind(this);
        this.error_callback = this.error_callback.bind(this);
        this.notificar = this.notificar.bind(this);
        this.actualizarPermiso = this.actualizarPermiso.bind(this);
        this.actualizarGrupo = this.actualizarGrupo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = (value) => {
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
        const cargarExamenes = () => this.props.fetchExamenes(id, () => noCargando(), this.error_callback);
        const cargarEntidad = () => this.props.fetchEntidad(id, cargarExamenes, this.error_callback);
        this.props.fetchMisPermisos(cargarEntidad, this.error_callback);

    }

    actualizarPermiso(permiso) {
        const {id} = this.props.match.params;
        const {cargando, noCargando} = this.props;
        cargando();
        const CargarPermisosUsuario = () => this.props.fetchOtroUsuarioPermisos(id, () => noCargando(), this.error_callback);
        this.props.addPermisoUsuario(id, permiso.id, CargarPermisosUsuario, this.error_callback)
    }

    actualizarGrupo(grupo) {
        const {id} = this.props.match.params;
        const {cargando, noCargando} = this.props;
        cargando();
        const CargarUsuario = () => this.props.fetchUsuario(id, () => noCargando(), this.error_callback);
        this.props.addGrupoUsuario(id, grupo.id, CargarUsuario, this.error_callback)
    }

    render() {
        const {entidad, mis_permisos, examenes} = this.props;
        const permisos = permisosAdapter(mis_permisos, permisos_view);

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

                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>Contactos</h2>
                        <BloqueContactos
                            list={entidad.mis_contactos}
                            mis_permisos={mis_permisos} {...this.props}
                        />
                    </div>
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>Examenes</h2>
                        <BloqueEntidadExamenes list={entidad.mis_examenes}
                                               examenes_list={examenes}
                                               mis_permisos={mis_permisos}
                                               {...this.props}
                        />
                    </div>
                </SwipeableViews>
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
        examenes: state.examenes
    }
}

export default connect(mapPropsToState, actions)(EntidadDetail)