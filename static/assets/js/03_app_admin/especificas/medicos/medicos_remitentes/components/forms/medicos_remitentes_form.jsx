import React, {Component, Fragment} from 'react';
import {reduxForm, reset} from 'redux-form';
import {MyTextFieldSimple, MySelectField} from '../../../../../../00_utilities/components/ui/forms/fields';
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
            especialidades_list,
            handleSubmit,
            modal_open,
            element_type
        } = this.props;
        return (
            <MyFormTagModal
                onCancel={() => {
                    onCancel();
                    reset()
                }}
                onSubmit={handleSubmit(onSubmit)}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={element_type}
            >
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Nombres'
                    name='nombres'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Apellidos'
                    name='apellidos'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Teléfono'
                    name='telefono'
                    case='U'/>
                <MySelectField
                    className='col-12 col-md-6'
                    nombre='Especialidad'
                    name='especialidad'
                    options={
                        _.map(especialidades_list, e => {
                            return {
                                value: e.id,
                                primaryText: e.nombre
                            }
                        })
                    }
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

const afterSubmit = (result, dispatch) => {
    dispatch(reset('medicosRemitentesForm'));
};


Form = reduxForm({
    form: "medicosRemitentesForm",
    onSubmitSuccess: afterSubmit,
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;