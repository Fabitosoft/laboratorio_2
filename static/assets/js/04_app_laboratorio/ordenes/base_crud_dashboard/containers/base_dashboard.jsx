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
    PERMISOS_1 as bloque_1_permisos,
    PERMISOS_2 as bloque_2_permisos,
} from "../../../../00_utilities/permisos/types";

import BloqueTabBase from '../../ordenes/components/ordenes_list';

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
        this.plural_name = 'NOMBREs DASHBOARDs';
        this.singular_name = 'NOMBRE DASHBOARD';
        this.cargarDatos = this.cargarDatos.bind(this);

    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    componentDidMount() {
        this.cargarDatos();
    }


    componentWillUnmount() {
        this.props.clearAlgos();
    }

    cargarDatos() {
        const {notificarErrorAjaxAction, cargando} = this.props;
        cargando();
        const cargarBloques2 = () => this.props.fetchAlgos(() => this.props.noCargando(), notificarErrorAjaxAction);
        const cargarBloques1 = () => this.props.fetchAlgos(cargarBloques2, notificarErrorAjaxAction);
        this.props.fetchMisPermisos(cargarBloques1, notificarErrorAjaxAction)
    }

    render() {
        const {bloque_1_list, bloque_2_list, mis_permisos} = this.props;
        const permisos_object_1 = permisosAdapter(mis_permisos, bloque_1_permisos);
        const permisos_object_2 = permisosAdapter(mis_permisos, bloque_2_permisos);

        const can_see =
            permisos_object_1.list ||
            permisos_object_2.list;
        return (
            <ValidarPermisos can_see={can_see} nombre={this.plural_name}>
                <Titulo>{this.singular_name}</Titulo>

                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Bloques 1" value={0}/>
                    <Tab label="Bloques 2" value={1}/>
                </Tabs>

                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div style={styles.slide}>
                        <BloqueTabBase
                            object_list={bloque_1_list}
                            permisos_object={permisos_object_1}
                            {...this.props}
                        />
                    </div>
                    <div style={styles.slide}>
                        <BloqueTabBase
                            object_list={bloque_2_list}
                            permisos_object={permisos_object_2}
                            {...this.props}
                        />
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
        bloque_1_list: state.algos,
        bloque_2_list: state.algos
    }
}

export default connect(mapPropsToState, actions)(ListadoElementos)