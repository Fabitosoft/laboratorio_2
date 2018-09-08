import React, {Component, Fragment} from 'react';
import {MyTextFieldSimple, MyCheckboxSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import InfoExamenForm from '../info_examen';
import FirmaForm from '../firmas_form';
import validate from '../examen_estandar_validate';
import PrinJs from "print-js";

const modelStyle = {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
};

class FormExamenEstandar extends Component {
    imprimirExamen() {
        const {
            item_seleccionado,
            printOrdenExamen,
            notificarErrorAjaxAction,
            noCargando
        } = this.props;
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            PrinJs(url);
            noCargando();
        };
        printOrdenExamen(item_seleccionado.id, success_callback, (r) => {
            notificarErrorAjaxAction(r, 60000);
            noCargando();
        })
    }

    render() {
        const {
            pristine,
            submitting,
            reset,
            initialValues,
            onSubmit,
            onCancel,
            handleSubmit,
            modal_open,
            cargarOrdenesExamenes,
            item_seleccionado,
            disabled
        } = this.props;
        return (
            <MyFormTagModal
                fullScreen={true}
                onCancel={() => {
                    onCancel();
                    cargarOrdenesExamenes();
                }}
                onSubmit={handleSubmit((v) => onSubmit({
                    ...v,
                    es_biopsia: true
                }, null, null, false, item_seleccionado))}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={`Resultado ${item_seleccionado.examen_nombre} (${item_seleccionado.nro_examen_especial})`}
                modelStyle={modelStyle}
            >
                <InfoExamenForm examen={item_seleccionado}/>
                <div className="col-12">
                    <div className="row">
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Nombre Informe'
                            name='nombre'
                        />
                        <MyTextFieldSimple
                            className="col-12 col-md-2"
                            nombre='Número Interno'
                            name='nro_examen_especial'
                        />
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Descripción Macroscopica'
                            name='descripcion_macroscopica'
                            disabled={disabled}
                            multiline={true}
                            rowsMax={8}
                        />
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Descripción Microscopica'
                            name='descripcion_microscopica'
                            disabled={disabled}
                            multiline={true}
                            rowsMax={8}
                        />
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Diagnostico'
                            name='diagnostico'
                            disabled={disabled}
                            multiline={true}
                            rowsMax={8}
                        />

                    </div>
                </div>
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Observaciones'
                    name='observaciones'
                    disabled={disabled}
                    multiline={true}
                    rowsMax={3}
                />
                {
                    (submitting || pristine) &&
                    <FirmaForm {...this.props} examen={{...item_seleccionado, resultado: "Es Biopsia"}}/>
                }
                {
                    item_seleccionado.examen_estado === 2 &&
                    <span className='btn btn-primary' onClick={() => this.imprimirExamen()}>
                    <i className='far fa-print'></i>
                    </span>
                }
            </MyFormTagModal>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {biopsia} = ownProps;
    const biopsia_initial_values = biopsia && biopsia.nombre ? biopsia : {
        ...biopsia,
        nombre: 'Informe Patología'
    };
    return {
        initialValues: biopsia_initial_values
    }
}

FormExamenEstandar = reduxForm({
    form: "resultadoBiopsiaForm",
    validate,
    enableReinitialize: true
})(FormExamenEstandar);

FormExamenEstandar = (connect(mapPropsToState, null)(FormExamenEstandar));

export default FormExamenEstandar;