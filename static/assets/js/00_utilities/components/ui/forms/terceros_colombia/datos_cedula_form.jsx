import React, {Component, Fragment} from 'react';

import {
    MyRadioButtonGroup,
    MyDateTimePickerField,
    MyTextFieldSimple,
    MySelect
} from '../fields';

export default class DatosCedulaForm extends Component {
    render() {
        return (
            <Fragment>
                <div className="col-12">
                    <h4>Información Personal</h4>
                </div>

                <MyTextFieldSimple
                    className='col-12 col-md-6 col-xl-3'
                    nombre='Nombre'
                    name='nombre'
                    case='U'
                />

                <MyTextFieldSimple
                    className='col-12 col-md-6 col-xl-3'
                    nombre='Segundo Nombre'
                    name='nombre_segundo'
                    case='U'
                />

                <MyTextFieldSimple
                    className='col-12 col-md-6 col-xl-3'
                    nombre='Apellido'
                    name='apellido'
                    case='U'
                />

                <MyTextFieldSimple
                    className='col-12 col-md-6 col-xl-3'
                    nombre='Segundo Apellido'
                    name='apellido_segundo'
                    case='U'
                />
                <MySelect
                    className='col-12 col-md-6 col-xl-3'
                    name='tipo_documento'
                    nombre='Tipo de documento'
                    data={[
                        {value: "CC", label: "Cédula Ciudadania"},
                        {value: "CE", label: "Cédula Extrangería"},
                        {value: "PS", label: "Pasaporte"},
                        {value: "TI", label: "Tarjeta de Identidad"},
                    ]}
                />

                <MyTextFieldSimple
                    className='col-12 col-md-6 col-xl-3'
                    nombre='Nro. Identificación'
                    name='nro_identificacion'
                />

                <MySelect
                    className="col-12 col-md-6 col-xl-3"
                    name="grupo_sanguineo"
                    nombre='Grupo Sanguineo'
                    data={[
                        {value: "NI", label: "Indefinido"},
                        {value: "APOSITIVO", label: "A Positivo"},
                        {value: "OPOSITIVO", label: "O Positivo"},
                        {value: "ONEGATIVO", label: "O Negativo"},
                        {value: "ANEGATIVO", label: "A Negativo"},
                    ]}
                />

                <div className="col-12">
                    <div className="row">
                        <MyDateTimePickerField
                            className="col-12 col-lg-6"
                            nombre='Fecha de Nacimiento'
                            name='fecha_nacimiento'
                            show_edad={true}
                        />
                        <MyRadioButtonGroup
                            className="col-12 col-lg-6"
                            nombre='Genero'
                            name='genero'
                            options={[
                                {value: "M", label: "Masculino"},
                                {value: "F", label: "Femenino"}
                            ]}
                        />
                    </div>
                </div>

            </Fragment>
        )
    }
}
