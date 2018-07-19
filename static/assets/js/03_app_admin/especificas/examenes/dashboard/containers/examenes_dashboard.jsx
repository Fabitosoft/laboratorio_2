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
    GRUPOS_CUPS as bloque_1_permisos,
    SUBGRUPOS_CUPS as bloque_2_permisos,
    EXAMENES as bloque_3_permisos,
} from "../../../../../00_utilities/permisos/types";

import BloqueGrupos from '../../cups_grupos/components/grupos_cups_list';
import BloqueSubGrupos from '../../cups_sub_grupos/components/sub_grupos_cups_list';
import BloqueExamenes from '../../examenes/components/examenes_list';

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
        this.plural_name = 'Gestion Examenes';
        this.singular_name = 'Gestion Examen';
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
        this.props.clearCupsGrupos();
        this.props.clearCupsSubGrupos();
        this.props.clearExamenes();
    }

    cargarDatos() {
        const {notificarErrorAjaxAction, cargando} = this.props;
        cargando();
        const cargarBloques3 = () => this.props.fetchExamenes(() => this.props.noCargando(), notificarErrorAjaxAction);
        const cargarBloques2 = () => this.props.fetchCupsSubGrupos(cargarBloques3, notificarErrorAjaxAction);
        const cargarBloques1 = () => this.props.fetchCupsGrupos(cargarBloques2, notificarErrorAjaxAction);
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
                    <Tab label="Grupos Cups" value={0}/>
                    <Tab label="Sub Grupos Cups" value={1}/>
                    <Tab label="Examenes" value={2}/>
                </Tabs>

                {
                    this.state.slideIndex === 0 &&
                    <BloqueGrupos
                        object_list={bloque_1_list}
                        permisos_object={permisos_object_1}
                        {...this.props}
                    />
                }
                {
                    this.state.slideIndex === 1 &&
                    <BloqueSubGrupos
                        grupos_cups_list={bloque_1_list}
                        object_list={bloque_2_list}
                        permisos_object={permisos_object_2}
                        {...this.props}
                    />
                }
                {
                    this.state.slideIndex === 2 &&
                    <BloqueExamenes
                        object_list={bloque_3_list}
                        grupos_cups_list={bloque_1_list}
                        permisos_object={permisos_object_3}
                        {...this.props}
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
        bloque_1_list: state.cups_grupos,
        bloque_2_list: state.cups_subgrupos,
        bloque_3_list: state.examenes
    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)