import React, {Component, Fragment} from 'react';
import {reduxForm, reset} from 'redux-form';
import {MyTextFieldSimple, MyCheckboxSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import {
    SelectField
} from 'redux-form-material-ui'
import {Field} from 'redux-form';
import MenuItem from 'material-ui/MenuItem';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            grupo_cups_seleccionado: null,
            es_especial: false
        });
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
            element_type
        } = this.props;
        const {grupo_cups_seleccionado} = this.state;
        return (
            <MyFormTagModal
                onCancel={() => {
                    onCancel();
                    this.setState({grupo_cups_seleccionado: null, es_especial: false});
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
                    className="col-12 col-md-8"
                    nombre='Nombre'
                    name='nombre'
                    case='U'/>
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
    dispatch(reset('especialidadesForm'));
};


Form = reduxForm({
    form: "especialidadesForm",
    onSubmitSuccess: afterSubmit,
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;