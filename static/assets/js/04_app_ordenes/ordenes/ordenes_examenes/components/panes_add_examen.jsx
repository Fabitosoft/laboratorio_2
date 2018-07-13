import React, {Component} from 'react';
import Combobox from 'react-widgets/lib/Combobox';

class AddExamen extends Component {
    constructor(props) {
        super(props);
        this.state = {examen_seleccionado: null}
    }

    render() {
        const {entidad, adicionarExamen} = this.props;
        const {examen_seleccionado} = this.state;
        return (
            <div className="col-12 pt-4">
                <h5>Examenes Entidad</h5>
                {
                    entidad.mis_examenes.length > 0 ?
                        <div className="row">
                            <div className="col-9">
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
                                          onSelect={(e) => {
                                              this.setState({examen_seleccionado: e})
                                          }}
                                />
                            </div>
                            {
                                examen_seleccionado &&
                                <div className="col-3">
                                    <span className='btn btn-primary'
                                          onClick={() => adicionarExamen(examen_seleccionado)}>Adicionar</span>
                                </div>
                            }
                        </div> :
                        <span>No hay examenes asociados a esta entidad</span>
                }
            </div>
        )
    }
};

export default AddExamen;