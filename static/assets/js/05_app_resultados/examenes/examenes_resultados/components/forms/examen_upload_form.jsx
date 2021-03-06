import React, {Component, Fragment} from 'react';
import {MyDialogCreate} from '../../../../../00_utilities/components/ui/dialog';
import {FlatIconModal} from '../../../../../00_utilities/components/ui/icon/iconos_base';
import InfoExamenForm from './info_examen';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class FormExamenEstandar extends Component {
    constructor(props) {
        super(props);
        this.state = {mostrar_eliminar: false}
    }

    renderEliminar() {
        const {
            eliminarPDFExamenOrdenExamen,
            cargarOrdenesExamenes,
            item_seleccionado,
            setSelectItem,
        } = this.props;
        return (<Fragment>
            {
                this.state.mostrar_eliminar &&
                <div>Deseas eliminar este archivo?
                    <div>
                        <span
                            className='btn btn-primary mr-3'
                            onClick={() => {
                                eliminarPDFExamenOrdenExamen(
                                    item_seleccionado.id,
                                    (res) => {
                                        setSelectItem(res);
                                        cargarOrdenesExamenes();
                                    }
                                )
                            }}
                        >Sí</span>
                        <span
                            className='btn btn-secondary'
                            onClick={() => this.setState({mostrar_eliminar: false})}
                        >No</span>
                    </div>
                </div>
            }
        </Fragment>)
    }

    render() {
        const {
            onCancel,
            modal_open,
            cargarOrdenesExamenes,
            item_seleccionado,
            setSelectItem,
            onUploadPdf,
        } = this.props;
        return (
            <MyDialogCreate
                onCancel={() => {
                    onCancel();
                    cargarOrdenesExamenes();
                }}
                fullScreen={true}
                //onSubmit={handleSubmit((v) => onSubmit(v, null, null, false))}
                is_open={modal_open}
                element_type={`Resultado ${item_seleccionado.examen_nombre}`}
            >
                <InfoExamenForm examen={item_seleccionado}/>
                <div className='col-12 m-3'>
                    {
                        item_seleccionado.pdf_examen_url ?
                            <div>
                                <i className='far fa-file-pdf fa-4x puntero' onClick={
                                    () => {
                                        window.open(item_seleccionado.pdf_examen_url, "_blank");
                                    }
                                }>
                                </i>
                                <i className='fas fa-trash-alt puntero'
                                   style={{position: 'relative', right: '-5px', bottom: '-25px'}}
                                   onClick={() => {
                                       this.setState(s => ({mostrar_eliminar: !s.mostrar_eliminar}))
                                   }}>
                                </i>
                                {this.renderEliminar()}
                                {
                                    item_seleccionado.pdf_examen_encriptado ?
                                        <Fragment>
                                            <h3 style={{color: 'red'}}><i className='fas fa-exclamation'></i> Tendras
                                                problemas con este PDF</h3>
                                            Este PDF tiene problemas de encriptación y no permitirá hacer impresiones
                                            unidas en las ordenes.<br/>
                                            Trata de "Guardar como..." con un visor de PDF para hacer una copia sin este
                                            inconveniente.
                                        </Fragment> :
                                        <p>
                                            Cargue exitoso del archivo.
                                        </p>
                                }
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={item_seleccionado.cargue_sin_logo}
                                                onChange={() => {
                                                    const {
                                                        cargando,
                                                        noCargando,
                                                        updateOrdenExamen,
                                                        notificarErrorAjaxAction
                                                    } = this.props;
                                                    cargando();
                                                    updateOrdenExamen(
                                                        item_seleccionado.id,
                                                        {
                                                            ...item_seleccionado,
                                                            cargue_sin_logo: !item_seleccionado.cargue_sin_logo
                                                        },
                                                        (res) => {
                                                            setSelectItem(res);
                                                            noCargando();
                                                        },
                                                        notificarErrorAjaxAction
                                                    )
                                                }}
                                            />
                                        }
                                        label='No tiene logo'
                                    />
                                </div>
                            </div>
                            :
                            <input type="file"
                                   onChange={(e) => {
                                       onUploadPdf(
                                           e,
                                           item_seleccionado,
                                           res => {
                                               this.setState({mostrar_eliminar: false});
                                               setSelectItem(res);
                                               cargarOrdenesExamenes();
                                           });
                                   }}
                                   accept=".pdf"/>
                    }
                </div>
                <div>
                    <FlatIconModal
                        text='Cerrar'
                        onClick={
                            () => {
                                onCancel();
                            }
                        }
                    />
                </div>
            </MyDialogCreate>
        )
    }
}

export default FormExamenEstandar;