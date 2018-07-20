import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            busy_paciente: false,
            busy_medico_remitente: false,
            busy_entidad: false
        })
    }

    componentDidMount() {
        this.props.fetchEntidades();
        this.props.fetchPacientes();
        this.props.fetchMedicosRemitentes();
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
            singular_name,
            pacientes_list,
            medicos_remitentes_list,
            entidades_list,
        } = this.props;

        const {
            busy_paciente,
            busy_medico_remitente,
            busy_entidad
        } = this.state;
        return (
            <MyFormTagModal
                onCancel={onCancel}
                onSubmit={handleSubmit((values) => {
                    onSubmit({...values, tipo_pago: values.tipo_pago.id})
                })}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
            >

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
    form: "ordenenForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;