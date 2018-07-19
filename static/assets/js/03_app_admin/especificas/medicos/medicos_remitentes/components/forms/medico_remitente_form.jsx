import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {MyTextFieldSimple, MyCombobox} from '../../../../../../00_utilities/components/ui/forms/fields';
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
            especialidades_list,
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

                <MyCombobox
                    className='col-12'
                    nombre='Especialidad'
                    name='especialidad'
                    data={
                        _.map(especialidades_list, e => {
                            return {
                                value: e.id,
                                primaryText: e.nombre
                            }
                        })
                    }
                    textField='primaryText'
                    valuesField='value'
                    placeholder='Especialidad...'
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
    form: "algoForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;