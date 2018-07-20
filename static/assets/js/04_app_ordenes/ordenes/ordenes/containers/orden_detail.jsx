import React, {Component, Fragment} from 'react';
import PrinJs from 'print-js';
import {connect} from "react-redux";
import * as actions from "../../../../01_actions/01_index";
import CargarDatos from "../../../../00_utilities/components/system/cargar_datos";
import {Titulo, SinObjeto} from "../../../../00_utilities/templates/fragmentos";
import ValidarPermisos from "../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../00_utilities/common";
import CreateForm from '../components/forms/ordenes_form';
import AddExamen from '../../ordenes_examenes/components/panes_add_examen';
import TablaExamenes from '../../ordenes_examenes/components/ordenes_examenes_tabla';
import {
    ORDENES as permisos_view
} from "../../../../00_utilities/permisos/types";

import OrdenInformacion from '../components/informacion_orden_detail';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            modal_open: false,
            mostrar_enviar_correo: false,
        });
        this.cargarDatos = this.cargarDatos.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.adicionarExamen = this.adicionarExamen.bind(this);
        this.eliminarExamen = this.eliminarExamen.bind(this);
        this.cambiarDescuentoExamen = this.cambiarDescuentoExamen.bind(this);
        this.imprimirExamenes = this.imprimirExamenes.bind(this);
        this.imprimirRecibo = this.imprimirRecibo.bind(this);
    }

    componentDidMount() {
        this.cargarDatos();
    }

    onSubmit(item) {
        const {cargando, notificarErrorAjaxAction, notificarAction} = this.props;
        cargando();
        const successSubmitCallback = (item) => {
            const nombre = item.id;
            notificarAction(`Se ha actualizado con éxito la orden número ${nombre}`);
            this.setState({modal_open: false});
            this.cargarDatos()
        };
        this.props.updateOrden(
            item.id,
            item,
            successSubmitCallback,
            notificarErrorAjaxAction
        );
    }

    componentWillUnmount() {
        this.props.clearPermisos();
        this.props.clearOrdenes();
        this.props.clearPacientes();
        this.props.clearMedicosRemitentes();
        this.props.clearEntidades();
    }

    cargarDatos() {
        const {id} = this.props.match.params;
        const {noCargando, cargando, notificarErrorAjaxAction} = this.props;
        cargando();
        const cargarPropiedades = (orden) => {
            const cargarPaciente = () => this.props.fetchPaciente(
                orden.paciente,
                () => {
                    noCargando();
                }, notificarErrorAjaxAction
            );
            const cargarMedicoRemitente = () => {
                if (orden.medico_remitente) {
                    this.props.fetchMedicoRemitente(orden.medico_remitente, cargarPaciente, notificarErrorAjaxAction);
                } else {
                    cargarPaciente();
                }
            };
            this.props.fetchEntidad(orden.entidad, cargarMedicoRemitente, notificarErrorAjaxAction);
        };
        const cargarOrden = () => this.props.fetchOrden(id, cargarPropiedades, notificarErrorAjaxAction);
        const cargarExamenes = () => this.props.fetchOrdenesExamenes_por_orden(id, cargarOrden, notificarErrorAjaxAction);
        this.props.fetchMisPermisos(cargarExamenes, notificarErrorAjaxAction);

    }

    adicionarExamen(examen) {
        const {object} = this.props;
        const {noCargando, cargando, notificarErrorAjaxAction, notificarAction} = this.props;
        cargando();
        const examen_orden = {
            ...examen,
            examen: examen.examen_id,
            valor_total: parseFloat(examen.valor_examen),
            paciente_nombre: object.paciente_nombre,
            tecnica: examen.examen_tecnica,
            nro_plantilla: examen.nro_plantilla,
            especial: examen.especial,
            orden: object.id,
            descuento: 0,
            valor_descuento: 0,
            valor_final: parseFloat(examen.valor_examen)
        };

        const cargarOrden = () => this.props.fetchOrden(
            object.id,
            () => {
                notificarAction(`Se ha adicionado ${examen_orden.examen_nombre} a la orden`);
                noCargando();
            },
            notificarErrorAjaxAction
        );

        this.props.createOrdenExamen(
            examen_orden,
            cargarOrden,
            notificarErrorAjaxAction
        );
    }

    cambiarDescuentoExamen(examen, valor) {
        examen.valor_descuento = valor;
        examen.valor_final = examen.valor_total - valor;
        const {notificarErrorAjaxAction, notificarAction, object} = this.props;
        this.props.updateOrdenExamen(
            examen.id,
            examen,
            response => {
                notificarAction(`Se ha asignado correctamente el descuento al examen ${response.examen_nombre}`);
                this.props.fetchOrden(object.id);
            },
            notificarErrorAjaxAction
        )
    }

    eliminarExamen(examen) {
        const {object, deleteOrdenExamen, fetchOrden, cargando, noCargando, notificarErrorAjaxAction} = this.props;
        cargando();
        deleteOrdenExamen(
            examen.id, () => {
                fetchOrden(object.id, () => {
                        noCargando()
                    },
                    notificarErrorAjaxAction
                );
            },
            notificarErrorAjaxAction
        );
    }

    enviarCorreo(tipo) {
        const {object, cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        cargando();
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'prueba.pdf');
            //
            // document.body.appendChild(link);
            // link.click();
            PrinJs(url)
            //window.open(url, "_blank");
            notificarAction(`Se ha enviado correctamente los resultados`);
            noCargando();
        };
        this.props.enviarOrdenExamenesEmail(object.id, tipo, success_callback, (r) => {
            notificarErrorAjaxAction(r, 60000);
            noCargando();
        })
    }

    imprimirExamenes() {
        const {object, cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        cargando();
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            PrinJs(url);
            noCargando();
        };
        this.props.printOrdenExamenes(object.id, success_callback, (r) => {
            notificarErrorAjaxAction(r, 60000);
            noCargando();
        })
    }

    imprimirRecibo() {
        const {object, cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        cargando();
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            PrinJs(url);
            noCargando();
        };
        this.props.printOrdenRecibo(object.id, success_callback, (r) => {
            notificarErrorAjaxAction(r, 60000);
            noCargando();
        })
    }


    render() {
        const {
            object,
            mis_permisos,
            entidades_list,
            ordenes_examenes_list,
        } = this.props;
        const {modal_open, mostrar_enviar_correo} = this.state;
        const permisos = permisosAdapter(mis_permisos, permisos_view);

        const examenes_orden_array = _.map(ordenes_examenes_list, e => e);

        if (!object) {
            return <SinObjeto/>
        }

        const entidad = entidades_list[object.entidad];

        const cant_exam_verificados = examenes_orden_array.filter(e => e.examen_estado > 1).length;

        return (
            <ValidarPermisos can_see={permisos.detail} nombre='detalles de orden'>
                <Titulo>Orden de laboratorio
                    {
                        object.estado === 0 &&
                        permisos.change &&
                        <small>
                            <span className='puntero' onClick={() => this.setState({modal_open: true})}> (Editar)</span>
                        </small>
                    }
                </Titulo>
                {modal_open &&
                <CreateForm
                    {...this.props}
                    item_seleccionado={object}
                    modal_open={modal_open}
                    onCancel={() => this.setState({modal_open: false})}
                    onSubmit={this.onSubmit}
                    singular_name='Orden de Laboratorio'
                />
                }
                <div className="row">
                    <OrdenInformacion object={object}/>
                    {
                        entidad &&
                        object.estado === 0 &&
                        <AddExamen
                            {...this.props}
                            adicionarExamen={this.adicionarExamen}
                        />
                    }
                </div>
                <TablaExamenes
                    singular_name='examen de orden'
                    permisos_object={permisos}
                    data={examenes_orden_array}
                    onDelete={this.eliminarExamen}
                    cambiarDescuentoExamen={this.cambiarDescuentoExamen}
                    orden={object}
                />
                {
                    object.estado === 0 &&
                    examenes_orden_array.length > 0 &&
                    <button className='btn btn-primary'
                            onClick={() => this.onSubmit({...object, estado: 1})}>Pagado</button>
                }
                {
                    object.estado === 1 &&
                    <span className='btn btn-primary m-2' onClick={() => {
                        this.imprimirRecibo()
                    }}>Imprimir Recibo</span>
                }
                {
                    cant_exam_verificados > 0 &&
                    <Fragment>
                        <span className='btn btn-primary m-2' onClick={() => {
                            this.imprimirExamenes()
                        }}>Imprimir Examenes</span>
                        {
                            !mostrar_enviar_correo &&
                            <i className="far fa-plus-circle puntero"
                               onClick={() => this.setState({mostrar_enviar_correo: true})}>
                            </i>
                        }
                        {
                            mostrar_enviar_correo &&
                            <i className="far fa-minus-circle puntero"
                               onClick={() => this.setState({mostrar_enviar_correo: false})}>
                            </i>
                        }

                        {
                            mostrar_enviar_correo &&
                            <Fragment>
                                <span className='btn btn-primary m-2' onClick={() => {
                                    this.enviarCorreo('Entidad')
                                }}>Enviar A Entidad</span>

                                {
                                    object.paciente_email &&
                                    <span className='btn btn-primary m-2' onClick={() => {
                                        this.enviarCorreo('Cliente')
                                    }}>Cliente ({object.paciente_email.toLowerCase()})</span>
                                }
                            </Fragment>
                        }
                    </Fragment>
                }
                <CargarDatos cargarDatos={this.cargarDatos}/>
            </ValidarPermisos>
        )
    }

}

function mapPropsToState(state, ownProps) {
    const {id} = ownProps.match.params;
    return {
        esta_cargando: state.esta_cargando,
        mis_permisos: state.mis_permisos,
        object: state.ordenes[id],
        ordenes_examenes_list: state.ordenes_examenes,
        pacientes_list: state.pacientes,
        examenes_entidad_list: state.entidad_examenes,
        medicos_remitentes_list: state.medicos_remitentes,
        entidades_list: state.entidades
    }
}

export default connect(mapPropsToState, actions)(Detail)