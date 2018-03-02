import React, {Fragment, Component} from 'react'
import Tabla from './medicos_remitentes_tabla';
import CreateForm from './forms/medicos_remitentes_form';
import ListManager from "../../../../../00_utilities/components/CRUDTableManager";
import {
    MEDICOS_REMITENTES as permisos_view,
} from "../../../../../00_utilities/permisos/types";
import {permisosAdapter} from "../../../../../00_utilities/common";

class BloqueTab extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(item, tipo) {
        const nombre = `${item.nombres} ${item.apellidos}`;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        const success_callback = () => {
            notificarAction(`Se ha eliminado con éxito ${tipo.toLowerCase()} ${nombre}`);
            noCargando();
        };
        cargando();
        this.props.deleteMedicoRemitente(item.id, success_callback, notificarErrorAjaxAction)
    }

    onSubmit(item, tipo) {
        const nombre = `${item.nombres} ${item.apellidos}`;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        const success_callback = () => {
            notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${tipo.toLowerCase()} ${nombre}`);
            noCargando();
        };
        cargando();
        if (item.id) {
            this.props.updateMedicoRemitente(item.id, item, success_callback, notificarErrorAjaxAction);
        } else {
            this.props.createMedicoRemitente(item, success_callback, notificarErrorAjaxAction);
        }
    }

    render() {
        const {list, mis_permisos, especialidades_list} = this.props;
        const permisos = permisosAdapter(mis_permisos, permisos_view);
        return (
            <ListManager permisos={permisos} singular_name='medico remitente' plural_name='medicos remitentes'>
                {
                    (list_manager_state,
                     onSelectItem,
                     onCancel,
                     handleModalOpen,
                     handleModalClose) => {
                        return (
                            <Fragment>
                                {
                                    list_manager_state.modal_open &&
                                    <CreateForm
                                        especialidades_list={especialidades_list}
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
                                }
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
                                        const {cargando, noCargando, notificarErrorAjaxAction} = this.props;
                                        cargando();
                                        this.props.fetchMedicoRemitente(item.id, () => {
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