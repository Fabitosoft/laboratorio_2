import React, {Component, Fragment} from 'react';
import {MyTextFieldSimple, MyCheckboxSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import InfoExamenForm from '../info_examen';
import FirmaForm from '../firmas_form';
import validate from '../examen_estandar_validate';

const modelStyle = {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
};

class FormExamenEstandar extends Component {
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
                            nombre='Descripción Macroscopica'
                            name='descripcion_macroscopica'
                            disabled={disabled}
                            multiLine={true}
                            rows={3}
                        />
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Descripción Microscopica'
                            name='descripcion_microscopica'
                            disabled={disabled}
                            multiLine={true}
                            rows={3}
                        />
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Diagnostico'
                            name='diagnostico'
                            disabled={disabled}
                            multiLine={true}
                            rows={3}
                        />

                    </div>
                </div>
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Observaciones'
                    name='observaciones'
                    disabled={disabled}
                    multiLine={true}
                    rows={3}
                />
                <FirmaForm {...this.props} examen={{...item_seleccionado, resultado: "Es Biopsia"}}/>
            </MyFormTagModal>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {biopsia} = ownProps;
    return {
        initialValues: biopsia
    }
}

FormExamenEstandar = reduxForm({
    form: "resultadoBiopsiaForm",
    validate,
    enableReinitialize: true
})(FormExamenEstandar);

FormExamenEstandar = (connect(mapPropsToState, null)(FormExamenEstandar));

export default FormExamenEstandar;