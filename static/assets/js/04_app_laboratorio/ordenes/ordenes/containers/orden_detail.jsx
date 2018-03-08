import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../01_actions/01_index";
import CargarDatos from "../../../../00_utilities/components/system/cargar_datos";
import {Titulo, SinObjeto, AtributoTexto, AtributoBooleano} from "../../../../00_utilities/templates/fragmentos";
import ValidarPermisos from "../../../../00_utilities/permisos/validar_permisos";
import {permisosAdapter} from "../../../../00_utilities/common";
import CreateForm from '../components/forms/ordenes_form';
import AddExamen from '../../ordenes_examenes/components/panes_add_examen';
import TablaExamenes from '../../ordenes_examenes/components/ordenes_examenes_tabla';
import {
    ORDENES as permisos_view
} from "../../../../00_utilities/permisos/types";

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            modal_open: false
        });
        this.cargarDatos = this.cargarDatos.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.adicionarExamen = this.adicionarExamen.bind(this);
        this.eliminarExamen = this.eliminarExamen.bind(this);
        this.cambiarDescuentoExamen = this.cambiarDescuentoExamen.bind(this);
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
            const cargarMedicoRemitente = () => this.props.fetchMedicoRemitente(orden.medico_remitente, cargarPaciente, notificarErrorAjaxAction);
            this.props.fetchEntidad(orden.entidad, cargarMedicoRemitente, notificarErrorAjaxAction);
        };
        const cargarOrden = () => this.props.fetchOrden(id, cargarPropiedades, notificarErrorAjaxAction);
        this.props.fetchMisPermisos(cargarOrden, notificarErrorAjaxAction);

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
        const success_callback = () => {
            notificarAction(`Se ha enviado correctamente los resultados`);
            noCargando();
        };
        this.props.enviarOrdenExamenesEmail(object.id, tipo, success_callback, (r) => {
            notificarErrorAjaxAction(r, 60000);
            noCargando();
        })
    }

    render() {
        const {object, mis_permisos, entidades_list} = this.props;
        const {modal_open} = this.state;
        const permisos = permisosAdapter(mis_permisos, permisos_view);

        if (!object) {
            return <SinObjeto/>
        }

        const entidad = entidades_list[object.entidad];

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
                    <div className="col-12 pb-3">
                        <strong>Paciente:</strong> {object.paciente_nombre}<br/>
                        <small>{object.paciente_identificacion}</small>
                    </div>
                    <div className="col-md-6">
                        <strong>Entidad:</strong> {object.entidad_nombre}<br/>
                    </div>
                    <div className="col-md-6">
                        <strong>Médico Remitente:</strong> {object.medico_remitente_nombre}
                    </div>
                    <div className="col-md-6">
                        <strong>Forma de Pago:</strong> {object.tipo_pago}
                    </div>
                    <div className="col-12 pt-4">
                        <h4>Contacto Alternativo</h4>
                    </div>
                    <div className="col-md-6 col-xl-6 pl-4">
                        <strong>Nombre </strong>{object.nombre_contacto_alternativo}
                    </div>
                    <div className="col-md-6 col-xl-8 pl-4">
                        <strong>Número </strong>{object.numero_contacto_alternativo}
                    </div>
                    <div className="col-md-12 pl-4">
                        <strong>Dirección </strong>{object.direccion_contacto_alternativo}
                    </div>
                    {
                        entidad &&
                        object.estado === 0 &&
                        <AddExamen {...this.props} entidad={entidad} adicionarExamen={this.adicionarExamen}/>
                    }
                </div>
                <TablaExamenes
                    singular_name='examen de orden'
                    permisos_object={permisos}
                    data={object.mis_examenes}
                    onDelete={this.eliminarExamen}
                    cambiarDescuentoExamen={this.cambiarDescuentoExamen}
                    orden={object}
                />
                {
                    object.estado === 0 &&
                    <button className='btn btn-primary'
                            onClick={() => this.onSubmit({...object, estado: 1})}>Pagado</button>
                }
                <span className='btn btn-primary'
                      onClick={() => {
                          this.enviarCorreo('Cliente')
                      }}>
                    Enviar A Cliente
                </span>
                <span className='btn btn-primary'
                      onClick={() => {
                          this.enviarCorreo('Entidad')
                      }}>
                    Enviar A Entidad
                </span>
                <span className='btn btn-primary'
                      onClick={() => {
                          this.enviarCorreo('Ambos')
                      }}>
                    Enviar Ambos
                </span>
                <CargarDatos cargarDatos={this.cargarDatos}/>
            </ValidarPermisos>
        )
    }

}

function mapPropsToState(state, ownProps) {
    const {id} = ownProps.match.params;
    return {
        mis_permisos: state.mis_permisos,
        object: state.ordenes[id],
        pacientes_list: state.pacientes,
        medicos_remitentes_list: state.medicos_remitentes,
        entidades_list: state.entidades
    }
}

export default connect(mapPropsToState, actions)(Detail)