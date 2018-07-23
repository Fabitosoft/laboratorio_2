import React, {Component, Fragment} from 'react';
import {MyDialogCreate} from '../../../../../00_utilities/components/ui/dialog';
import {FlatIconModal} from '../../../../../00_utilities/components/ui/icon/iconos_base';
import InfoExamenForm from './info_examen';

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
                        item_seleccionado.pdf_examen ?
                            <div>
                                <i className='far fa-file-pdf fa-4x puntero' onClick={
                                    () => {
                                        window.open(item_seleccionado.pdf_examen, "_blank");
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