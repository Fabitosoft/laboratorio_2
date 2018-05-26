import React, {Component} from 'react';
import {MyTextFieldSimple} from '../../../../../00_utilities/components/ui/forms/fields';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import InfoExamenForm from './info_examen';
import FirmaForm from './firmas_form';
import validate from './examen_estandar_validate';

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
        } = this.props;
        return (
            <MyFormTagModal
                onCancel={() => {
                    onCancel();
                    cargarOrdenesExamenes();
                }}
                onSubmit={handleSubmit((v) => onSubmit(v, null, null, false))}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={`Resultado ${item_seleccionado.examen_nombre}`}
                modelStyle={modelStyle}
            >
                <InfoExamenForm examen={item_seleccionado}/>
                <MyTextFieldSimple
                    className="col-12 col-md-8 col-lg-4"
                    nombre='Valor Referencia'
                    multiLine={true}
                    rows={5}
                    name='examen_valor_referencia'
                    disabled={item_seleccionado.examen_estado > 1}
                />
                <div className="col-12 col-md-4 col-lg-4">
                    <div className="row">
                        <MyTextFieldSimple
                            className="col-12 col-md-6"
                            nombre='Técnica'
                            name='tecnica'
                            disabled={item_seleccionado.examen_estado > 1}
                        />
                        <MyTextFieldSimple
                            className="col-12 col-md-6"
                            nombre='Unidad Medida'
                            name='examen_unidad_medida'
                            disabled={item_seleccionado.examen_estado > 1}
                        />
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Resultado'
                            name='resultado'
                            multiLine={true}
                            rows={2}
                            disabled={item_seleccionado.examen_estado > 1}
                        />
                    </div>
                </div>
                <MyTextFieldSimple
                    className="col-12 col-lg-4"
                    nombre='Observaciones'
                    name='observaciones'
                    multiLine={true}
                    rows={3}
                    disabled={item_seleccionado.examen_estado > 1}
                />
                <FirmaForm {...this.props} examen={item_seleccionado}/>
            </MyFormTagModal>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {item_seleccionado} = ownProps;
    return {
        initialValues: item_seleccionado
    }
}

FormExamenEstandar = reduxForm({
    form: "resultadoEstandarForm",
    validate,
    enableReinitialize: true
})(FormExamenEstandar);

FormExamenEstandar = (connect(mapPropsToState, null)(FormExamenEstandar));

export default FormExamenEstandar;