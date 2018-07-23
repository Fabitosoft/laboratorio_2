import React, {Component} from 'react';
import CreateForm from './forms/examen_resultado_form';
import Tabla from './examenes_resultados_tabla';
import crudHOC from '../../../../00_utilities/components/hoc_crud';


const CRUD = crudHOC(CreateForm, Tabla);

class List extends Component {
    constructor(props) {
        super(props);
        this.method_pool = {
            fetchObjectMethod: this.fetchObjectMethod.bind(this),
            deleteObjectMethod: this.deleteObjectMethod.bind(this),
            createObjectMethod: this.createObjectMethod.bind(this),
            updateObjectMethod: this.updateObjectMethod.bind(this),
        };
        this.onUploadPdf = this.onUploadPdf.bind(this);
        this.plural_name = 'Examenes';
        this.singular_name = 'Examen';
    }

    onUploadPdf(e, item, callback = null) {
        const {notificarAction, notificarErrorAjaxAction} = this.props;
        const file = e.target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append('pdf_examen', file);
            this.props.uploadPDFExamenOrdenExamen(
                item.id,
                formData,
                () => {
                    this.props.fetchOrdenExamen(
                        item.id,
                        res => {
                            if (callback) {
                                callback(res);
                            }
                            notificarAction(`La ha subido el pdf para el examen ${orden_examene.nro_examen}`);
                        }
                    )
                },
                notificarErrorAjaxAction
            )
        }
    }

    successSubmitCallback(item) {
        const nombre = item.nombre;
        const {noCargando, notificarAction} = this.props;
        notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito el ${this.singular_name.toLowerCase()}`);
        noCargando()
    }


    successDeleteCallback(item) {
        const nombre = item.nombre;
        const {noCargando, notificarAction} = this.props;
        notificarAction(`Se ha eliminado con éxito el ${this.singular_name.toLowerCase()}`);
        noCargando()
    }

    fetchObjectMethod(item_id, successCallback) {
        const {cargando, noCargando, notificarErrorAjaxAction} = this.props;
        const success_method = () => {
            successCallback();
            noCargando();
        };
        cargando();
        const cargarMiCuenta = () => this.props.fetchMiCuenta(success_method, notificarErrorAjaxAction);
        this.props.fetchOrdenExamen(item_id, cargarMiCuenta, notificarErrorAjaxAction);
    }

    createObjectMethod(item, successCallback) {
    }

    updateObjectMethod(item, successCallback) {
        const {cargarOrdenesExamenes, cargando, notificarErrorAjaxAction} = this.props;
        let updateMethod = this.props.updateOrdenExamen;
        let fetchObjectMethod = this.props.fetchOrdenExamen;
        if (item.es_citologia) {
            updateMethod = this.props.updateCitologia;
            fetchObjectMethod = this.props.fetchCitologia;
        }
        if (item.es_biopsia) {
            updateMethod = this.props.updateBiopsia;
            fetchObjectMethod = this.props.fetchBiopsia;
        }
        const success_method = (response) => {
            this.successSubmitCallback(response);
            successCallback();
            cargarOrdenesExamenes();
        };
        cargando();
        const fetchObject = () => fetchObjectMethod(item.id, success_method, notificarErrorAjaxAction);
        updateMethod(item.id, item, fetchObject, notificarErrorAjaxAction);
    }

    deleteObjectMethod(item, successCallback) {

    }

    render() {
        const {object_list, permisos_object} = this.props;
        return (
            <CRUD
                onUploadPdf={this.onUploadPdf}
                method_pool={this.method_pool}
                list={object_list}
                permisos_object={permisos_object}
                plural_name={this.plural_name}
                singular_name={this.singular_name}
                {...this.props}
            />
        )
    }
}

export default List;