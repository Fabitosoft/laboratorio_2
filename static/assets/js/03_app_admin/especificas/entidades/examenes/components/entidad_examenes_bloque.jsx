import React, {Fragment, Component} from 'react'
import Tabla from './entidad_examenes_tabla';
import CreateForm from './forms/entidad_examenes_form';
import ListManager from "../../../../../00_utilities/components/CRUDTableManager";
import {
    GRUPOS_CUPS as permisos_view,
} from "../../../../../00_utilities/permisos/types";
import {permisosAdapter} from "../../../../../00_utilities/common";

class BloqueTab extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(item, tipo) {
        const nombre = item.examen_nombre;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction, entidad} = this.props;
        const success_callback = () => {
            notificarAction(`Se ha eliminado con éxito ${tipo.toLowerCase()} ${nombre}`);
            this.props.fetchEntidad(entidad.id, () => noCargando(), notificarErrorAjaxAction);
        };
        cargando();
        this.props.deleteEntidadExamen(item.id, success_callback, notificarErrorAjaxAction)
    }

    onSubmit(item, tipo) {
        const nombre = item.examen_nombre;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction, entidad} = this.props;
        const success_callback = () => {
            notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${tipo.toLowerCase()} ${nombre}`);
            this.props.fetchEntidad(entidad.id, () => noCargando(), notificarErrorAjaxAction);
        };
        cargando();
        if (item.id) {
            this.props.updateEntidadExamen(item.id, {
                ...item,
                entidad: entidad.id
            }, success_callback, notificarErrorAjaxAction);
        } else {
            this.props.createEntidadExamen({
                ...item,
                entidad: entidad.id
            }, success_callback, notificarErrorAjaxAction);
        }
    }

    render() {
        const {list, mis_permisos, examenes_list} = this.props;
        const permisos = permisosAdapter(mis_permisos, permisos_view);
        return (
            <ListManager permisos={permisos} singular_name='examen' plural_name='examenes'>
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
                                    examenes_list={examenes_list}
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
                                    element_type={`${list_manager_state.singular_name}`}
                                    onDelete={(item) => {
                                        this.onDelete(item, list_manager_state.singular_name);
                                        handleModalClose();
                                    }}
                                    updateItem={(item) => this.onSubmit(item, list_manager_state.singular_name)}
                                    onSelectItemEdit={(item) => {
                                        const {notificarErrorAjaxAction} = this.props;
                                        this.props.fetchEntidadExamen(item.id, () => {
                                                onSelectItem(item);
                                                handleModalOpen();
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