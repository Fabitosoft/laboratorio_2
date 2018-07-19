import React, {Component, Fragment} from 'react';

import {MyCombobox, MyRadioButtonGroup, MyDateTimePickerField, MyTextFieldSimple} from '../fields';

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
                <MyCombobox
                    className="col-12 col-md-6 col-xl-3"
                    name="tipo_documento"
                    nombre='Tipo de documento'
                    data={[
                        {id: "CC", nombre: "Cédula Ciudadania"},
                        {id: "CE", nombre: "Cédula Extrangería"},
                        {id: "PS", nombre: "Pasaporte"},
                        {id: "TI", nombre: "Tarjeta de Identidad"},
                    ]}
                    textField='nombre'
                    valuesField='id'
                    placeholder='Tipo Documento...'

                />
                <MyTextFieldSimple
                    className='col-12 col-md-6 col-xl-3'
                    nombre='Nro. Identificación'
                    name='nro_identificacion'
                />
                <MyCombobox
                    className="col-12 col-md-6 col-xl-3"
                    name="grupo_sanguineo"
                    nombre='Grupo Sanguineo'
                    data={[
                        {id: "NI", nombre: "Indefinido"},
                        {id: "APOSITIVO", nombre: "A Positivo"},
                        {id: "OPOSITIVO", nombre: "O Positivo"},
                        {id: "ONEGATIVO", nombre: "O Negativo"},
                        {id: "ANEGATIVO", nombre: "A Negativo"},
                    ]}
                    textField='nombre'
                    valuesField='id'
                    placeholder='Grupo Sanguineo...'

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
