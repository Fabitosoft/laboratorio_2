import React from 'react';
import Combobox from 'react-widgets/lib/Combobox';

const AddExamen = (props) => {
    const {entidad, adicionarExamen} = props;
    return (
        <div className="col-12 pt-4">
            <h5>Examenes Entidad</h5>
            {
                entidad.mis_examenes.length > 0 ?
                    <Combobox data={
                        entidad.mis_examenes.sort((a, b) => {
                            if (a.examen_nombre > b.examen_nombre) {
                                return 1;
                            }
                            if (a.examen_nombre < b.examen_nombre) {
                                return -1;
                            }
                            return 0;
                        })}
                              placeholder='Adiccionar Examen...'
                              valueField='id'
                              filter='contains'
                              textField='examen_nombre'
                              onChange={() => {
                                  console.log('cambio')
                              }}
                              onSelect={(e) => adicionarExamen(e)}
                    /> :
                    <span>No hay examenes asociados a esta entidad</span>
            }
        </div>
    )
};

export default AddExamen;