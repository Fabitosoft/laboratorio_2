import React, {Component, Fragment} from 'react';
import {MyTextFieldSimple, MyCheckboxSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import InfoExamenForm from '../info_examen';
import FirmaForm from '../firmas_form';
import validate from '../examen_estandar_validate';
import {formValueSelector} from 'redux-form';
import PrinJs from "print-js";

const modelStyle = {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
};

const selector = formValueSelector('resultadoCitologiaForm');

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
            notificarErrorAjaxAction,
            noCargando,
            cargando,
            cargarOrdenesExamenes,
            item_seleccionado,
            disabled,
            A1_1,
            A1_2,
            A3,
            B1,
            B1a,
            A1_1a,
            A1_1b,
            B2,
            B3,
            B6,
            B6a,
            B8,
        } = this.props;
        return (
            <MyFormTagModal
                fullScreen={true}
                onCancel={() => {
                    onCancel();
                    cargarOrdenesExamenes();
                }}
                onSubmit={handleSubmit((v) => {
                    onSubmit({
                            ...v,
                            es_citologia: true
                        },
                        null,
                        null,
                        false,
                        item_seleccionado);
                })
                }
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={`Resultado ${item_seleccionado.examen_nombre} (${item_seleccionado.nro_examen_especial})`}
                modelStyle={modelStyle}
            >
                <InfoExamenForm examen={item_seleccionado}/>
                <MyTextFieldSimple
                    className="col-12 col-md-2"
                    nombre='Número Interno'
                    name='nro_examen_especial'
                />
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <h4>Calidad de la Muestra</h4>
                                </div>
                                <MyCheckboxSimple
                                    name='A1_1'
                                    nombre='Satisfactoria para evaluación'
                                    className="col-12 col-md-4"
                                    disabled={A1_2 || A3 || disabled}
                                />
                                <MyCheckboxSimple
                                    name='A1_2'
                                    nombre='Insactisfactoria para evaluación'
                                    className="col-12 col-md-4"
                                    disabled={A1_1 || A3 || disabled}
                                />
                                <MyCheckboxSimple
                                    name='A3'
                                    nombre='Muestra no evaluada por'
                                    className="col-12 col-md-4"
                                    disabled={A1_1 || A1_2 || disabled}
                                />
                                <div className='col-12'>
                                    <div className="row pl-4 m-0 p-0 m-0">
                                        {
                                            A1_1 &&
                                            <Fragment>
                                                <MyCheckboxSimple
                                                    name='A1_1a'
                                                    nombre='Con presencia de células endocervicales'
                                                    className="col-12 col-md-6 col-lg-4"
                                                    disabled={A1_1b || disabled}
                                                />
                                                <MyCheckboxSimple
                                                    name='A1_1b'
                                                    nombre='Sin presencia de células endocervicales'
                                                    className="col-12 col-md-6 col-lg-4"
                                                    disabled={A1_1a || disabled}
                                                />
                                            </Fragment>
                                        }
                                        {
                                            (A1_2 || A1_1) &&
                                            <Fragment>
                                                <MyCheckboxSimple
                                                    name='A1_i'
                                                    nombre='Exudado inflamatorio'
                                                    className="col-12 col-md-6 col-lg-4"
                                                    disabled={disabled}
                                                />
                                                <MyCheckboxSimple
                                                    name='A1_ii'
                                                    nombre='Hemorragia'
                                                    className="col-12 col-md-6 col-lg-4"
                                                    disabled={disabled}
                                                />
                                                <MyCheckboxSimple
                                                    name='A1_iii'
                                                    nombre='Citolisis'
                                                    className="col-12 col-md-6 col-lg-4"
                                                    disabled={disabled}
                                                />
                                                <MyCheckboxSimple
                                                    name='A1_iv'
                                                    nombre='Extendido Grueso'
                                                    className="col-12 col-md-6 col-lg-4"
                                                    disabled={disabled}
                                                />
                                                <MyCheckboxSimple
                                                    name='A1_v'
                                                    nombre='Mala preservación/fijación'
                                                    className="col-12 col-md-6 col-lg-4"
                                                    disabled={disabled}
                                                />
                                                <MyCheckboxSimple
                                                    name='A1_vi'
                                                    nombre='Escasa Celularidad'
                                                    className="col-12 col-md-6 col-lg-4"
                                                    disabled={disabled}
                                                />
                                                <MyCheckboxSimple
                                                    name='A1_vii'
                                                    nombre='Datos Clínicos Insuficientes'
                                                    className="col-12 col-md-6 col-lg-4"
                                                    disabled={disabled}
                                                />
                                            </Fragment>
                                        }

                                        {
                                            A3 &&
                                            <Fragment>
                                                <MyCheckboxSimple
                                                    name='A3a'
                                                    nombre='Ruptura de la placa que hace imposible la reparación'
                                                    className="col-12 col-md-6"
                                                    disabled={disabled}
                                                />
                                                <MyCheckboxSimple
                                                    name='A3b'
                                                    nombre='Ausencia de Identificación'
                                                    className="col-12 col-md-6"
                                                    disabled={disabled}
                                                />
                                            </Fragment>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            !A3 &&
                            <Fragment>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>Interpretación</h4>
                                        </div>

                                        <MyCheckboxSimple
                                            name='B1'
                                            nombre='Negativa para lesión intraepitelial o malignidad'
                                            className="col-12"
                                            disabled={disabled}
                                        />
                                        {
                                            B1 &&
                                            <div className='col-12'>
                                                <div className="row pl-4 m-0 p-0 m-0">
                                                    <MyCheckboxSimple
                                                        name='B1a'
                                                        nombre='Con cambios celulares reactivos asociados a'
                                                        className="col-12"
                                                        disabled={disabled}
                                                    />
                                                    {
                                                        B1a &&
                                                        <div className='col-12'>
                                                            <div className="row pl-4 m-0 p-0 m-0">
                                                                <MyCheckboxSimple
                                                                    name='B1a_i'
                                                                    nombre='Inflamación'
                                                                    className="col-12 col-md-4 col-lg-3"
                                                                    disabled={disabled}
                                                                />
                                                                <MyCheckboxSimple
                                                                    name='B1a_ii'
                                                                    nombre='Irradiación'
                                                                    className="col-12 col-md-4 col-lg-3"
                                                                    disabled={disabled}
                                                                />
                                                                <MyCheckboxSimple
                                                                    name='B1a_iii'
                                                                    nombre='Dispositivo Intrauterino'
                                                                    className="col-12 col-md-4 col-lg-3"
                                                                    disabled={disabled}
                                                                />
                                                                <MyCheckboxSimple
                                                                    name='B1a_iv'
                                                                    nombre='Reparación'
                                                                    className="col-12 col-md-4 col-lg-3"
                                                                    disabled={disabled}
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    <MyCheckboxSimple
                                                        name='B1b'
                                                        nombre='Con Cambios por Atrofia'
                                                        className="col-12 col-md-6"
                                                        disabled={disabled}
                                                    />
                                                    <MyCheckboxSimple
                                                        name='B1c'
                                                        nombre='Con Células glandulares benignas post-histerectomía'
                                                        className="col-12 col-md-6"
                                                        disabled={disabled}
                                                    />
                                                    <MyCheckboxSimple
                                                        name='B1d'
                                                        nombre='Con presencia de células endometriales fuera de fase'
                                                        className="col-12 col-md-6"
                                                        disabled={disabled}
                                                    />
                                                </div>
                                            </div>
                                        }

                                        <MyCheckboxSimple
                                            name='B2'
                                            nombre='Anormalidad en células epiteliales escamosas'
                                            className="col-12"
                                            disabled={disabled}
                                        />
                                        {
                                            B2 &&
                                            <div className='col-12'>
                                                <div className="row pl-4 m-0 p-0 m-0">
                                                    <MyCheckboxSimple
                                                        name='B2a'
                                                        nombre='De significado indeterminado (ASC-US)'
                                                        className="col-12"
                                                        disabled={disabled}
                                                    />
                                                    <MyCheckboxSimple
                                                        name='B2b'
                                                        nombre='Que no permite excluir lesión intraepitelial de alto grado'
                                                        className="col-12"
                                                        disabled={disabled}
                                                    />
                                                </div>
                                            </div>
                                        }

                                        <MyCheckboxSimple
                                            name='B3'
                                            nombre='Lesión escamosa epitelial de bajo grado'
                                            className="col-12"
                                            disabled={disabled}
                                        />
                                        {
                                            B3 &&
                                            <div className='col-12'>
                                                <div className="row pl-4 m-0 p-0 m-0">
                                                    <MyCheckboxSimple
                                                        name='B3a'
                                                        nombre='Incluye cambios por VPH'
                                                        className="col-12"
                                                        disabled={disabled}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        <MyCheckboxSimple
                                            name='B6'
                                            nombre='Anormalidades en'
                                            className="col-12"
                                            disabled={disabled}
                                        />
                                        {
                                            B6 &&
                                            <div className='col-12'>
                                                <div className="row pl-4 m-0 p-0 m-0">
                                                    <MyCheckboxSimple
                                                        name='B6a'
                                                        nombre='Células epiteliales'
                                                        className="col-12 col-md-6 col-lg-4"
                                                        disabled={disabled}
                                                    />
                                                    {
                                                        B6a &&
                                                        <div className='col-12'>
                                                            <div className="row pl-4 m-0 p-0 m-0">
                                                                <MyCheckboxSimple
                                                                    name='B6a_i'
                                                                    nombre='Endocervicales sin ninguna otra especificación'
                                                                    className="col-12 col-md-6 col-lg-4"
                                                                    disabled={disabled}
                                                                />
                                                                <MyCheckboxSimple
                                                                    name='B6a_ii'
                                                                    nombre='Endometriales sin ninguna otra especificación'
                                                                    className="col-12 col-md-6 col-lg-4"
                                                                    disabled={disabled}
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                        <MyCheckboxSimple
                                            name='B8'
                                            nombre='Adenocarcinoma'
                                            className="col-12"
                                            disabled={disabled}
                                        />
                                        {
                                            B8 &&
                                            <div className='col-12'>
                                                <div className="row pl-4 m-0 p-0 m-0">
                                                    <MyCheckboxSimple
                                                        name='B8a'
                                                        nombre='Endocervical'
                                                        className="col-12 col-md-6 col-lg-4"
                                                        disabled={disabled}
                                                    />
                                                    <MyCheckboxSimple
                                                        name='B8b'
                                                        nombre='Endometrial'
                                                        className="col-12 col-md-6 col-lg-4"
                                                        disabled={disabled}
                                                    />
                                                    <MyCheckboxSimple
                                                        name='B8c'
                                                        nombre='Extrauterino'
                                                        className="col-12 col-md-6 col-lg-4"
                                                        disabled={disabled}
                                                    />
                                                    <MyCheckboxSimple
                                                        name='B8d'
                                                        nombre='De sitio no especificado'
                                                        className="col-12 col-md-6 col-lg-4"
                                                        disabled={disabled}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        <MyCheckboxSimple
                                            name='B4'
                                            nombre='Lesión escamosa epitelial de alto grado'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                        <MyCheckboxSimple
                                            name='B5'
                                            nombre='Carcinoma escamocelular'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                        <MyCheckboxSimple
                                            name='B7'
                                            nombre='Adenocarcinoma endocervical in situ'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                        <MyCheckboxSimple
                                            name='B9'
                                            nombre='Otra Neoplastia Maligna'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>Microorganismos</h4>
                                        </div>
                                        <MyCheckboxSimple
                                            name='C1'
                                            nombre='No se observan microorganismos patógenos'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                        <MyCheckboxSimple
                                            name='C2'
                                            nombre='Bacterias morfológicamente consistentes con actinomyces'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                        <MyCheckboxSimple
                                            name='C3'
                                            nombre='Desviación de la flora sugestiva de vaginosis bacteriana'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                        <MyCheckboxSimple
                                            name='C4'
                                            nombre='Trichonomas vaginalis'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                        <MyCheckboxSimple
                                            name='C5'
                                            nombre='Hongos mofológicamente compatibles con Candida Sp'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                        <MyCheckboxSimple
                                            name='C6'
                                            nombre='Cambios citopáticos asociados a Herpes'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                        <MyCheckboxSimple
                                            name='C7'
                                            nombre='No se observan microorganismos'
                                            className="col-12 col-md-6"
                                            disabled={disabled}
                                        />
                                    </div>
                                </div>
                            </Fragment>
                        }
                    </div>
                </div>
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Observaciones'
                    name='observaciones'
                    disabled={disabled}
                    multiline={true}
                    rows={3}
                />
                {
                    (submitting || pristine) &&
                    <FirmaForm {...this.props} examen={{...item_seleccionado, resultado: "Es Citología"}}/>
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
    const {citologia} = ownProps;
    const {
        A1_1,
        A1_2,
        A3,
        B1,
        B1a,
        A1_1a,
        A1_1b,
        B2,
        B3,
        B6,
        B6a,
        B8,
    } = selector(state,
        'A1_1',
        'A1_2',
        'A3',
        'B1',
        'B1a',
        'A1_1a',
        'A1_1b',
        'B2',
        'B3',
        'B6',
        'B6a',
        'B8',
    );
    return {
        initialValues: citologia,
        A1_1: A1_1,
        A1_2: A1_2,
        A3: A3,
        B1: B1,
        B1a: B1a,
        A1_1a: A1_1a,
        A1_1b: A1_1b,
        B2: B2,
        B3: B3,
        B6: B6,
        B6a: B6a,
        B8: B8,
    }
}

FormExamenEstandar = reduxForm({
    form: "resultadoCitologiaForm",
    validate,
    enableReinitialize: true
})(FormExamenEstandar);

FormExamenEstandar = (connect(mapPropsToState, null)(FormExamenEstandar));

export default FormExamenEstandar;