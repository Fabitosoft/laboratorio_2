import React, {Fragment, Component} from 'react'
import Tabla from './entidades_tabla';
import CreateForm from './forms/entidades_form';
import ListManager from "../../../../../00_utilities/components/CRUDTableManager";
import {
    ENTIDADES as permisos_view
} from "../../../../../00_utilities/permisos/types";
import {permisosAdapter} from "../../../../../00_utilities/common";

class BloqueTab extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCreateEntidadUsuario = this.onCreateEntidadUsuario.bind(this);
    }

    onDelete(item, tipo) {
        const nombre = item.nombre;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        const success_callback = () => {
            notificarAction(`Se ha eliminado con éxito ${tipo.toLowerCase()} ${nombre}`)
            noCargando();
        };
        cargando();
        this.props.deleteEntidad(item.id, success_callback, notificarErrorAjaxAction)
    }

    onSubmit(item, tipo) {
        const nombre = item.nombre;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        const success_callback = () => {
            notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${tipo.toLowerCase()} ${nombre}`);
            noCargando();
        };
        cargando();
        if (item.id) {
            this.props.updateEntidad(item.id, item, success_callback, notificarErrorAjaxAction);
        } else {
            this.props.createEntidad(item, success_callback, notificarErrorAjaxAction);
        }
    }

    onCreateEntidadUsuario(item, tipo) {
        const nombre = item.nombre;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        cargando();
        const success_callback = () => {
            notificarAction(`Se ha creado con éxito el usuario para ${tipo.toLowerCase()} ${nombre}`);
            noCargando();
        };
        this.props.createEntidadUsuario(item.id, success_callback, notificarErrorAjaxAction)
    }

    render() {
        const {list, mis_permisos} = this.props;
        const permisos = permisosAdapter(mis_permisos, permisos_view);
        return (
            <ListManager permisos={permisos} singular_name='entidad' plural_name='entidades'>
                {
                    (list_manager_state,
                     onSelectItem,
                     onCancel,
                     handleModalOpen,
                     handleModalClose) => {
                        return (
                            <Fragment>
                                <CreateForm
                                    onCancel={onCancel}
                                    item_seleccionado={list_manager_state.item_seleccionado}
                                    onSubmit={
                                        (item) => {
                                            this.onSubmit(item, list_manager_state.singular_name);
                                            handleModalClose();
                                        }
                                    }
                                    modal_open={list_manager_state.modal_open}
                                    element_type={`${list_manager_state.singular_name}`}
                                />
                                <Tabla
                                    data={_.map(list, e => e)}
                                    permisos={permisos}
                                    onCreateEntidadUsuario={(item) => {
                                        this.onCreateEntidadUsuario(item, list_manager_state.singular_name)
                                    }}
                                    element_type={`${list_manager_state.singular_name}`}
                                    onDelete={(item) => {
                                        this.onDelete(item, list_manager_state.singular_name);
                                        handleModalClose();
                                    }}
                                    updateItem={(item) => this.onSubmit(item, list_manager_state.singular_name)}
                                    onSelectItemEdit={(item) => {
                                        const {cargando, noCargando, notificarErrorAjaxAction} = this.props;
                                        cargando();
                                        this.props.fetchEntidad(item.id, () => {
                                                onSelectItem(item);
                                                handleModalOpen();
                                                noCargando();
                                            },
                                            notificarErrorAjaxAction
                                        )
                                    }}
                                />

                            </Fragment>
                        )
                    }
                }
            </ListManager>
        )
    }
}

export default BloqueTab;