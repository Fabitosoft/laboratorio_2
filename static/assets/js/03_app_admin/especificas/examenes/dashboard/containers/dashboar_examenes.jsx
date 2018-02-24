import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../01_actions/01_index";
import CargarDatos from "../../../../../00_utilities/components/system/cargar_datos";
import {Titulo} from "../../../../../00_utilities/templates/fragmentos";
import ValidarPermisos from "../../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../../00_utilities/common";
import {
    EXAMENES as examenes_permisos,
    GRUPOS_CUPS as grupos_cups_permisos,
    SUBGRUPOS_CUPS as subgrupos_cups_permisos
} from "../../../../../00_utilities/permisos/types";
import BloqueTabExamenes from '../../examenes/components/examenes_bloque';
import BloqueTabGrupoCups from '../../cups_grupos/components/grupos_cups_bloque';
import BloqueTabSubGrupoCups from '../../cups_sub_grupos/components/subgrupos_cups_bloque';

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

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    componentDidMount() {
        this.cargarDatos();
    }

    error_callback(error) {
        this.props.notificarErrorAjaxAction(error);
    }


    componentWillUnmount() {
        this.props.clearExamenes();
        this.props.clearCupsGrupos();
        this.props.clearCupsSubGrupos();
    }

    cargarDatos() {
        this.props.cargando();
        const cargarSubGruposCups = () => this.props.fetchCupsSubGrupos(() => this.props.noCargando(), this.error_callback);
        const cargarGruposCups = () => this.props.fetchCupsGrupos(cargarSubGruposCups, this.error_callback);
        const cargarExamenes = () => this.props.fetchExamenes(cargarGruposCups, this.error_callback);
        this.props.fetchMisPermisos(cargarExamenes, this.error_callback)
    }

    render() {
        const {examenes_list, grupos_cups_list, subgrupos_cups_list, mis_permisos} = this.props;

        const can_see =
            permisosAdapter(mis_permisos, examenes_permisos).list ||
            permisosAdapter(mis_permisos, grupos_cups_permisos).list ||
            permisosAdapter(mis_permisos, subgrupos_cups_permisos).list;
        return (
            <ValidarPermisos can_see={can_see} nombre='Examenes'>
                <Titulo>{`Examenes`}</Titulo>

                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Grupos Cups" value={0}/>
                    <Tab label="Subgrupos Cups" value={1}/>
                    <Tab label="Examenes" value={2}/>
                </Tabs>

                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>Grupos Cups</h2>
                        <BloqueTabGrupoCups {...this.props} list={grupos_cups_list} mis_permisos={mis_permisos}/>
                    </div>
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>Subgrupos Cups</h2>
                        <BloqueTabSubGrupoCups {...this.props} list={subgrupos_cups_list} mis_permisos={mis_permisos}
                                               grupos_cups_list={grupos_cups_list}/>
                    </div>
                    <div>
                        <h2 style={styles.headline}>Examenes</h2>
                        <BloqueTabExamenes {...this.props} list={examenes_list} mis_permisos={mis_permisos}
                                           grupos_cups_list={grupos_cups_list}/>
                    </div>
                </SwipeableViews>

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
        grupos_cups_list: state.cups_grupos,
        subgrupos_cups_list: state.cups_subgrupos,
        examenes_list: state.examenes

    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)