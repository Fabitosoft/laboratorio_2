import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../01_actions/01_index";
import CargarDatos from "../../../../00_utilities/components/system/cargar_datos";
import {Titulo} from "../../../../00_utilities/templates/fragmentos";
import ValidarPermisos from "../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../00_utilities/common";
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {
    ORDENES_EXAMENES as bloque_1_permisos
} from "../../../../00_utilities/permisos/types";

import BloqueTabBase from '../../examenes_resultados/components/examenes_resultados_list';

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
        this.plural_name = 'Resultados';
        this.singular_name = 'Resultado';
        this.cargarDatos = this.cargarDatos.bind(this);
        this.renderSlideContent = this.renderSlideContent.bind(this);
        this.cargarOrdenesExamenes = this.cargarOrdenesExamenes.bind(this);

    }

    handleChange = (value) => {
        if (value !== this.state.slideIndex) {
            this.cargarOrdenesExamenes(value);
        }
        this.setState({
            slideIndex: value,
        });
    };

    componentDidMount() {
        this.cargarDatos();
    }


    componentWillUnmount() {
        this.props.clearOrdenesExamenes();
    }

    cargarDatos() {
        const {notificarErrorAjaxAction, cargando} = this.props;
        cargando();
        this.props.fetchMisPermisos(() => this.cargarOrdenesExamenes(), notificarErrorAjaxAction)
    }

    cargarOrdenesExamenes(value = null) {
        const {notificarErrorAjaxAction, cargando, noCargando} = this.props;
        let index = value !== null ? value : this.state.slideIndex;
        cargando();
        this.props.clearOrdenesExamenes();
        if (index === 0) {
            this.props.fetchOrdenesExamenesxEstado('pendientes', () => noCargando(), notificarErrorAjaxAction);
        } else if (index === 1) {
            this.props.fetchOrdenesExamenesxEstado('con_resultados', () => noCargando(), notificarErrorAjaxAction);
        } else if (index === 2) {
            this.props.fetchOrdenesExamenesxEstado('verificados', () => noCargando(), notificarErrorAjaxAction);
        }
    }

    renderSlideContent(permisos_object_1) {
        const {bloque_1_list} = this.props;
        return (
            <div style={styles.slide}>
                <BloqueTabBase
                    object_list={bloque_1_list}
                    permisos_object={permisos_object_1}
                    {...this.props}
                    cargarOrdenesExamenes={this.cargarOrdenesExamenes}
                />
            </div>
        )
    }

    render() {
        const {mis_permisos} = this.props;
        const {slideIndex} = this.state;
        const permisos_object_1 = {...permisosAdapter(mis_permisos, bloque_1_permisos), add: false};

        const can_see =
            permisos_object_1.list_pendientes ||
            permisos_object_1.list_con_resultados ||
            permisos_object_1.list_verificados;
        return (
            <ValidarPermisos can_see={can_see} nombre={this.plural_name}>
                <Titulo>{this.singular_name}</Titulo>

                <Tabs
                    onChange={this.handleChange}
                    value={slideIndex}
                >
                    <Tab label="Pendientes" value={0}/>
                    <Tab label="Con Resultados" value={1}/>
                    <Tab label="Verificados" value={2}/>
                </Tabs>

                <SwipeableViews
                    index={slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    {this.renderSlideContent({...permisos_object_1, list: permisos_object_1.list_pendientes})}
                    {this.renderSlideContent({...permisos_object_1, list: permisos_object_1.list_con_resultados})}
                    {this.renderSlideContent({...permisos_object_1, list: permisos_object_1.list_verificados})}
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
        bloque_1_list: state.ordenes_examenes,
        especialistas_list: state.especialistas,
        citologias_list: state.citologias,
        biopsias_list: state.biopsias,
        mi_cuenta: state.mi_cuenta
    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)