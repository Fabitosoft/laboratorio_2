import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../01_actions/01_index";
import CargarDatos from "../../../../00_utilities/components/system/cargar_datos";
import TablaResultadosExamenes from '../components/resultados_examenes_tabla';
import TablaResultadosOrdenes from '../components/resultados_ordenes_tabla';
import {permisosAdapter} from "../../../../00_utilities/common";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    ORDENES_EXAMENES as bloque_1_permisos
} from "../../../../00_utilities/permisos/types";


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
        this.cargarDatos = this.cargarDatos.bind(this);
        this.verOrden = this.verOrden.bind(this);
        this.verExamen = this.verExamen.bind(this);
    }

    handleChange = (event, value) => {
        this.setState({
            slideIndex: value,
        });
    };

    verOrden(orden_id, con_logo = true) {
        const {
            cargando,
            noCargando,
            notificarErrorAjaxAction,
            printOrdenesExamenes_en_orden,
            printOrdenesExamenes_sin_logo_en_orden
        } = this.props;
        cargando();
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            window.open(url, "_blank");
            noCargando();
        };
        if (con_logo) {
            printOrdenesExamenes_en_orden(orden_id, success_callback, (r) => {
                notificarErrorAjaxAction(r, 60000);
                noCargando();
            })
        } else {
            printOrdenesExamenes_sin_logo_en_orden(orden_id, success_callback, (r) => {
                notificarErrorAjaxAction(r, 60000);
                noCargando();
            })
        }
    }

    verExamen(examen_id, con_logo = true) {
        const {
            cargando,
            noCargando,
            notificarErrorAjaxAction,
            printOrdenExamen,
            printOrdenExamen_sin_logo
        } = this.props;
        cargando();
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            window.open(url, "_blank");
            noCargando();
        };
        if (con_logo) {
            printOrdenExamen(examen_id, success_callback, (r) => {
                notificarErrorAjaxAction(r, 60000);
                noCargando();
            })
        } else {
            printOrdenExamen_sin_logo(examen_id, success_callback, (r) => {
                notificarErrorAjaxAction(r, 60000);
                noCargando();
            })
        }
    }

    componentDidMount() {
        this.cargarDatos();
    }

    componentWillUnmount() {
        this.props.clearOrdenesExamenes();
        this.props.clearOrdenes();
    }

    cargarDatos() {
        const {cargando, noCargando, notificarErrorAjaxAction} = this.props;
        cargando();
        const mi_cuenta = JSON.parse(localStorage.getItem('mi_cuenta'));
        const cargarOrdenes = () => this.props.fetchOrdenes_por_entidad(mi_cuenta.mi_entidad, () => noCargando(), notificarErrorAjaxAction);
        const cargarResultados = () => this.props.fetchOrdenesExamenes_por_entidad(mi_cuenta.mi_entidad, cargarOrdenes, notificarErrorAjaxAction);
        this.props.fetchMisPermisos(cargarResultados, notificarErrorAjaxAction)

    }

    render() {
        const {ordenes_examenes, ordenes, mis_permisos} = this.props;
        const permisos_object_1 = permisosAdapter(mis_permisos, bloque_1_permisos);
        return (
            <Fragment>
                <h4>Examenes y Resultados</h4>
                {
                    permisos_object_1.imprimir_sin_logo &&
                    <Fragment>
                        <p>Aquí podrá consultar los resultados a nivel de examen y orden. Tendrá la posibilidad de
                            imprimir
                            tanto con y sin logo de nuestro laboratorio.</p>
                        <i className='far fa-file-pdf fa-2x pr-2'
                           style={{color: 'blue'}}
                        >
                        </i>Con Logo
                        <i className='far fa-file-pdf fa-2x pl-2 pr-2'
                           style={{color: 'green'}}
                        >
                        </i>Sin Logo
                    </Fragment>
                }

                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Examenes" value={0}/>
                    <Tab label="Ordenes" value={1}/>
                </Tabs>

                {
                    this.state.slideIndex === 0 &&
                    <TablaResultadosExamenes
                        data={ordenes_examenes}
                        permisos={permisos_object_1}
                        verExamen={this.verExamen}
                    />
                }
                {
                    this.state.slideIndex === 1 &&
                    <TablaResultadosOrdenes
                        data={ordenes}
                        permisos={permisos_object_1}
                        verOrden={this.verOrden}
                    />
                }
                <CargarDatos
                    cargarDatos={this.cargarDatos}
                />
            </Fragment>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        ordenes_examenes: state.ordenes_examenes,
        ordenes: state.ordenes,
        mis_permisos: state.mis_permisos,
    }
}

export default connect(mapPropsToState, actions)(List)