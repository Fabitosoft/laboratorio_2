const validate = values => {
    const errors = {};

    const requiredFields = [
        'paciente',
        'entidad',
        'tipo_pago',
        'nro_orden',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });
    return errors;
};

export default validate;