import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {
    MyTextFieldSimple,
    MyCombobox
} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import CedulaForm from '../../../../../../00_utilities/components/ui/forms/terceros_colombia/datos_cedula_form';
import LectorCedula from '../../../../../../00_utilities/components/ui/forms/terceros_colombia/lector_cedula_form';

const modelStyle = {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
};

class Form extends Component {
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
            singular_name,
            setSelectItem,
            especialidades_list,
        } = this.props;
        return (
            <MyFormTagModal
                fullScreen={true}
                onCancel={onCancel}
                onSubmit={handleSubmit(onSubmit)}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
                modelStyle={modelStyle}
            >
                <LectorCedula setSelectItem={setSelectItem}>
                    <CedulaForm/>

                    <div className="col-12">
                        <h4>Información de Contacto</h4>
                    </div>
                    <MyTextFieldSimple
                        className='col-12'
                        nombre='Correo Electrónico'
                        name='email'
                        case='U'
                    />
                    <MyTextFieldSimple
                        className='col-12 col-md-6 col-xl-6'
                        nombre='Teléfono'
                        name='telefono'
                    />
                    <MyTextFieldSimple
                        className='col-12 col-md-6 col-xl-6'
                        nombre='Teléfono 2'
                        name='telefono_2'
                    />

                    <MyCombobox
                        className='col-12'
                        nombre='Especialidad'
                        name='especialidad'
                        data={
                            _.map(especialidades_list, e => {
                                return {value: e.id, primaryText: e.nombre}
                            })
                        }
                        textField='primaryText'
                        valuesField='value'
                        placeholder='Especialidad...'
                    />
                    <MyTextFieldSimple
                        className='col-12 col-md-6 col-xl-6'
                        nombre='Universidad'
                        name='universidad'
                        case='U'
                    />
                    <MyTextFieldSimple
                        className='col-12 col-md-6 col-xl-6'
                        nombre='Nro. Registro Profesional'
                        name='registro_profesional'
                    />
                </LectorCedula>
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