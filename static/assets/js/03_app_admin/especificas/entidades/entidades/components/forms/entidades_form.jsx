import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {MyTextFieldSimple, MyCheckboxSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';


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
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Nombre Entidad'
                    name='nombre'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Nit'
                    name='nit'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Dirección'
                    name='direccion'
                    case='U'/>
                <MyCheckboxSimple
                    className='col-12'
                    nombre='Activo'
                    name='activo'
                />
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
    form: "entidadForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;