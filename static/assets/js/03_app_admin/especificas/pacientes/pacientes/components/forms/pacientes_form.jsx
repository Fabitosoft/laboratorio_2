import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {MyTextFieldSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import CedulaForm from '../../../../../../00_utilities/components/ui/forms/terceros_colombia/datos_cedula_form';
import LectorCedula from '../../../../../../00_utilities/components/ui/forms/terceros_colombia/lector_cedula_form';


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
        } = this.props;
        return (
            <MyFormTagModal
                onCancel={onCancel}
                onSubmit={handleSubmit(onSubmit)}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
            >
                <LectorCedula setSelectItem={setSelectItem}>
                    <CedulaForm/>

                    <div className="col-12">
                        <h4>Información de Contacto</h4>
                    </div>
                    <MyTextFieldSimple
                        className='col-12 col-xl-6'
                        nombre='Correo Electrónico'
                        name='email'
                        case='U'
                    />
                    <MyTextFieldSimple
                        className='col-12 col-md-6 col-xl-3'
                        nombre='Teléfono'
                        name='telefono'
                    />
                    <MyTextFieldSimple
                        className='col-12 col-md-6 col-xl-3'
                        nombre='Teléfono 2'
                        name='telefono_2'
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
    form: "pacientesForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;