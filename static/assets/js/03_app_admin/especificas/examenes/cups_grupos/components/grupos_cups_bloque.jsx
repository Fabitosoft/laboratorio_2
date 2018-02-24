import React, {Fragment, Component} from 'react'
import Tabla from './grupos_cups_tabla';
import CreateForm from './forms/grupos_cups_form';
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
        const nombre = item.nombre;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        const success_callback = () => {
            noCargando();
            notificarAction(`Se ha eliminado con éxito ${tipo.toLowerCase()} ${nombre}`)
        };
        cargando();
        this.props.deleteCupsGrupo(item.id, success_callback, notificarErrorAjaxAction)
    }

    onSubmit(item, tipo) {
        const nombre = item.nombre;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        const success_callback = () => {
            notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${tipo.toLowerCase()} ${nombre}`);
            notificarAction('Cargando Sub Grupos Cups');
            const cargarExamenes = () => {
                notificarAction('Cargando Examenes');
                this.props.fetchExamenes(() => {
                    notificarAction('Se ha actualizado con éxito');
                    noCargando();
                }, notificarErrorAjaxAction)
            };
            this.props.fetchCupsSubGrupos(cargarExamenes, notificarErrorAjaxAction);
        };
        cargando();
        if (item.id) {
            this.props.updateCupsGrupo(item.id, item, success_callback, notificarErrorAjaxAction);
        } else {
            this.props.createCupsGrupo(item, success_callback, notificarErrorAjaxAction);
        }
    }

    render() {
        const {list, mis_permisos} = this.props;
        const permisos = permisosAdapter(mis_permisos, permisos_view);
        return (
            <ListManager permisos={permisos} singular_name='grupo cups' plural_name='grupos cups'>
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
                                    element_type={`${list_manager_state.singular_name}`}
                                    onDelete={(item) => {
                                        this.onDelete(item, list_manager_state.singular_name);
                                        handleModalClose();
                                    }}
                                    updateItem={(item) => this.onSubmit(item, list_manager_state.singular_name)}
                                    onSelectItemEdit={(item) => {
                                        const {notificarErrorAjaxAction} = this.props;
                                        this.props.fetchCupsGrupo(item.id, () => {
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