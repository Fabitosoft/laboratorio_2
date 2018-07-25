const validate = values => {
    const errors = {};

    const requiredFields = [
        'username',
        'password',
        'punto_venta',
        'codigo_consulta_web',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });
    if (values.codigo_consulta_web && values.codigo_consulta_web.length !== 8) {
        errors.codigo_consulta_web = 'Debe ser un código de 8 dígitos'
    }
    return errors;
};

export default validate;