import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {MyTextFieldSimple} from '../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import Firma from './examen_resultado_form_firma';
import FirmarComo from './examen_resultado_form_firmar_como';

const modelStyle = {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
};


class Form extends Component {
    renderVerificar() {
        const {
            initialValues,
            updateOrdenExamen,
            setSelectItem,
            notificarErrorAjaxAction
        } = this.props;
        const nuevo_estado = initialValues.examen_estado === 1 ? 2 : 1;

        const onClick = () => {
            updateOrdenExamen(initialValues.id, {...initialValues, examen_estado: nuevo_estado},
                response => {
                    setSelectItem(response)
                },
                notificarErrorAjaxAction
            )
        };

        return (
            <span
                className='btn btn-primary'
                onClick={onClick}>
                        {initialValues.examen_estado === 1 ? 'Verificar' : 'Quitar Verificado'}
                    </span>

        )
    }

    renderFirmar() {
        const {
            initialValues,
            notificarErrorAjaxAction,
            setSelectItem,
            firmarOrdenExamen,
        } = this.props;
        const puede_firmar =
            (
                (!initialValues.multifirma && initialValues.mis_firmas.length === 0) ||
                initialValues.multifirma
            ) &&
            initialValues.examen_estado < 2;
        const onClick = () => {
            firmarOrdenExamen(initialValues.id, (r) => setSelectItem(r), notificarErrorAjaxAction)
        };

        return (
            puede_firmar &&
            <span
                className='btn btn-primary'
                onClick={onClick}
            >
                        Firmar
                    </span>
        )
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
            permisos_object,
            mi_cuenta,
        } = this.props;

        const esta_verificado = initialValues.examen_estado > 1;
        const puede_firmar_como = permisos_object.firmar_como;
        const tiene_firmas = initialValues.mis_firmas.length > 0;
        const puede_verificar = permisos_object.verificar;
        const es_especialista = mi_cuenta.especialista;
        const tiene_resultados = (initialValues.resultado || initialValues.resultado === 0);

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
                element_type={`Resultado ${initialValues.examen_nombre}`}
                modelStyle={modelStyle}
            >
                <div className="col-md-4">
                    <strong>Examen: </strong>{initialValues.examen_nombre}<br/>
                </div>
                <div className="col-md-4">
                    <strong>Paciente: </strong>{initialValues.paciente_nombre}
                </div>
                <div className="col-md-4">
                    <strong>Entidad: </strong>{initialValues.entidad_nombre}
                </div>
                <MyTextFieldSimple
                    className="col-12 col-md-8 col-lg-4"
                    nombre='Valor Referencia'
                    multiLine={true}
                    rows={5}
                    name='examen_valor_referencia'
                    disabled={initialValues.examen_estado > 1}
                />
                <div className="col-12 col-md-4 col-lg-4">
                    <div className="row">
                        <MyTextFieldSimple
                            className="col-12 col-md-6"
                            nombre='Técnica'
                            name='tecnica'
                            disabled={initialValues.examen_estado > 1}
                        />
                        <MyTextFieldSimple
                            className="col-12 col-md-6"
                            nombre='Unidad Medida'
                            name='examen_unidad_medida'
                            disabled={initialValues.examen_estado > 1}
                        />
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Resultado'
                            name='resultado'
                            multiLine={true}
                            rows={2}
                            disabled={initialValues.examen_estado > 1}
                        />
                    </div>
                </div>
                <MyTextFieldSimple
                    className="col-12 col-lg-4"
                    nombre='Observaciones'
                    name='observaciones'
                    multiLine={true}
                    rows={3}
                    disabled={initialValues.examen_estado > 1}
                />
                <div className="col-12">
                    <div className="row">
                        {initialValues.mis_firmas.map(firma => {
                            return <Firma key={firma.id} firma={firma} {...this.props}/>
                        })}
                    </div>
                </div>
                {
                    tiene_resultados &&
                    es_especialista &&
                    this.renderFirmar()
                }
                {
                    initialValues.examen_estado >= 1 &&
                    puede_verificar &&
                    tiene_firmas &&
                    tiene_resultados &&
                    this.renderVerificar()
                }
                {
                    tiene_resultados &&
                    puede_firmar_como &&
                    !esta_verificado &&
                    <FirmarComo especialistas_list={this.props.especialistas_list} {...this.props}/>
                }
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

Form = reduxForm({
    form: "algoForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;