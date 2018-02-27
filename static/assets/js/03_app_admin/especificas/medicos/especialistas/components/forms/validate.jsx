import {REGEX_CORREO_ELECTRONICO} from '../../../../../../00_utilities/common';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'nombre',
        'apellido',
        'grupo_sanguineo',
        'tipo_documento',
        'nro_identificacion',
        'genero',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });
    if (values.email) {
        if (!REGEX_CORREO_ELECTRONICO.test(values.email)) {
            errors.email = 'Correo Electrónico Inválido';
        }
    }
    return errors;
};

export default validate;

