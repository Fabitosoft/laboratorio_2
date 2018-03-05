import React, {Component} from 'react';
import CreateForm from './forms/medicos_especialistas_form';
import Tabla from './medicos_especialistas_tabla';
import crudHOC from '../../../../../00_utilities/components/hoc_crud';


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
        this.plural_name = 'Especialistas';
        this.singular_name = 'Especialista';
        this.onChangeFirma = this.onChangeFirma.bind(this);
    }

    successSubmitCallback(item) {
        const nombre = item.nombre;
        const {noCargando, notificarAction} = this.props;
        notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${this.singular_name.toLowerCase()} ${nombre}`);
        noCargando()
    }


    successDeleteCallback(item) {
        const nombre = item.nombre;
        const {noCargando, notificarAction} = this.props;
        notificarAction(`Se ha eliminado con éxito ${this.singular_name.toLowerCase()} ${nombre}`);
        noCargando()
    }

    fetchObjectMethod(item_id, successCallback) {
        const {cargando, noCargando, notificarErrorAjaxAction} = this.props;
        const success_method = () => {
            successCallback();
            noCargando();
        };
        cargando();
        this.props.fetchEspecialista(item_id, success_method, notificarErrorAjaxAction);
    }

    createObjectMethod(item, successCallback) {
        const {cargando, notificarErrorAjaxAction} = this.props;
        const success_method = () => {
            this.successSubmitCallback(item);
            successCallback();
        };
        cargando();
        this.props.createEspecialista(item, success_method, notificarErrorAjaxAction);
    }

    updateObjectMethod(item, successCallback) {
        const {cargando, notificarErrorAjaxAction} = this.props;
        const success_method = () => {
            this.successSubmitCallback(item);
            successCallback();
        };
        cargando();
        this.props.updateEspecialista(item.id, item, success_method, notificarErrorAjaxAction);
    }

    onChangeFirma(e, item) {
        const {notificarAction, notificarErrorAjaxAction} = this.props;
        const error_callback = (error) => {
            notificarErrorAjaxAction(error);
        };
        const file = e.target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append('firma', file);
            this.props.updateEspecialista(
                item.id,
                formData,
                (especialista) => {
                    this.props.fetchEspecialista(
                        especialista.id,
                        () => notificarAction(`La firma se ha cambiado para ${item.full_name}`),
                        notificarErrorAjaxAction
                    )
                },
                error_callback
            )
        }
    }

    deleteObjectMethod(item, successCallback) {
        const {cargando, notificarErrorAjaxAction} = this.props;
        const success_method = () => {
            this.successDeleteCallback(item);
            successCallback();
        };
        cargando();
        this.props.deleteEspecialista(item.id, success_method, notificarErrorAjaxAction);
    }

    render() {
        const {object_list, permisos_object, especialidades_list} = this.props;
        return (
            <CRUD
                especialidades_list={especialidades_list}
                onChangeFirma={this.onChangeFirma}
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