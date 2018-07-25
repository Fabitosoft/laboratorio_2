import {REGEX_SOLO_NUMEROS} from "../../../../../00_utilities/common";
import momentLocaliser from 'react-widgets-moment';
import moment from 'moment-timezone';

moment.tz.setDefault("America/Bogota");
momentLocaliser(moment);

const validate = values => {
    const errors = {};
    const requiredFields = [
        'password_old',
        'password_2',
        'password',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });

    if (values.password && values.password_2 && values.password_2 !== values.password) {
        errors.password_2 = 'No coinciden';
        errors.password = 'No coinciden';
    }

    if (values.password && values.password.length < 8) {
        errors.password = 'Debe tener al menos 8 dígitos';
    }

    if (values.password && !/[a-z]/.test(values.password)) {
        errors.password = 'Debe tener al menos una letra minuscula';
    }

    if (values.password && !/[A-Z]/.test(values.password)) {
        errors.password = 'Debe tener al menos una letra mayuscula';
    }

    if (values.password && !/[0-9]/.test(values.password)) {
        errors.password = 'Debe tener al menos un número';
    }

    return errors;
};

export default validate;