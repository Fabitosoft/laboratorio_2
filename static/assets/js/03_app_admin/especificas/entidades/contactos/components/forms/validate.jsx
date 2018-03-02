import {REGEX_CORREO_ELECTRONICO} from "../../../../../../00_utilities/common";

const validate = values => {
    const errors = {};

    const requiredFields = [
        'nombre',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });

    if (!values.correo_electronico) {
        errors.correo_electronico = 'Requerido';
    } else if (!REGEX_CORREO_ELECTRONICO.test(values.correo_electronico)) {
        errors.correo_electronico = 'Debe ser un correo electrónico válido';
    }
    return errors;
};

export default validate;