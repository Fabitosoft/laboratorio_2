import {REGEX_SOLO_NUMEROS_DINERO} from "../../../../../../00_utilities/common";

const validate = values => {
    const errors = {};

    const requiredFields = [
        'nombre',
        'subgrupo_cups',
        'costo_referencia',
        'codigo_cups',
        'grupo_cups',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });

    if (values.costo_referencia && values.costo_referencia < 0) {
        errors.costo_referencia = `Debe ser un número mayor a 0`;
    } else if (!REGEX_SOLO_NUMEROS_DINERO.test(values.costo_referencia)) {
        errors.costo_referencia = `Debe ser un valor`;
    }
    return errors;
};

export default validate;