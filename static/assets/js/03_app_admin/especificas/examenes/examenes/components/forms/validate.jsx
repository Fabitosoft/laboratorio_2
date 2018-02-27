import {REGEX_SOLO_NUMEROS_DINERO} from "../../../../../../00_utilities/common";

const validate = values => {
    const errors = {};
    const requiredFields = [
        'nombre',
        'codigo_cups',
        'tecnica',
        'unidad_medida',
        'valor_referencia',
        'grupo_cups',
        'nro_plantilla',
        'subgrupo_cups',
        'costo_referencia',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });

    if (!REGEX_SOLO_NUMEROS_DINERO.test(values.costo_referencia)) {
        errors.costo_referencia = `Este campo debe de ser sólo unidades monetarias`;
    }
    return errors;
};

export default validate;