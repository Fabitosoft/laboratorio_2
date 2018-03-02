import React, {Component} from 'react';
import CreateForm from './forms/grupos_cups_form';
import Tabla from './grupos_cups_tabla';
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
        this.plural_name = 'Grupos Cups';
        this.singular_name = 'Grupo Cups';
    }

    successSubmitCallback(item) {
        const nombre = item.nombre;
        const {noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        const cargarSubGrupos = () => this.props.fetchCupsSubGrupos(() => {
                notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${this.singular_name.toLowerCase()} ${nombre}`);
                noCargando()
            },
            notificarErrorAjaxAction
        );
        this.props.fetchExamenes(cargarSubGrupos, notificarErrorAjaxAction);
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
        this.props.fetchCupsGrupo(item_id, success_method, notificarErrorAjaxAction);
    }

    createObjectMethod(item, successCallback) {
        const {cargando, notificarErrorAjaxAction} = this.props;
        const success_method = () => {
            this.successSubmitCallback(item);
            successCallback();
        };
        cargando();
        this.props.createCupsGrupo(item, success_method, notificarErrorAjaxAction);
    }

    updateObjectMethod(item, successCallback) {
        const {cargando, notificarErrorAjaxAction} = this.props;
        const success_method = () => {
            this.successSubmitCallback(item);
            successCallback();
        };
        cargando();
        this.props.updateCupsGrupo(item.id, item, success_method, notificarErrorAjaxAction);
    }

    deleteObjectMethod(item, successCallback) {
        const {cargando, notificarErrorAjaxAction} = this.props;
        const success_method = () => {
            this.successDeleteCallback(item);
            successCallback();
        };
        cargando();
        this.props.deleteCupsGrupo(item.id, success_method, notificarErrorAjaxAction);
    }

    render() {
        const {object_list, permisos_object} = this.props;
        return (
            <CRUD
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