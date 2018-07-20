import React, {Component} from 'react';
import Select from 'react-select';

class AddExamen extends Component {
    constructor(props) {
        super(props);
        this.state = {examen_seleccionado: null}
    }

    componentDidMount() {
        const {noCargando, cargando, notificarErrorAjaxAction, object} = this.props;
        cargando();
        this.props.fetchEntidadesExamenes_por_entidad(object.id, () => noCargando(), notificarErrorAjaxAction);
    }

    render() {
        const {
            adicionarExamen,
            examenes_entidad_list
        } = this.props;
        const {
            examen_seleccionado
        } = this.state;
        const mis_examenes = _.map(_.orderBy(examenes_entidad_list, ['nombre'], ['asc']), e => e);

        return (
            <div className="col-12 pt-4">
                <h5>Examenes Entidad</h5>
                {
                    mis_examenes && mis_examenes.length > 0 ?
                        <div className="row">
                            <div className="col-9">
                                <Select
                                    valueKey='id'
                                    labelKey='examen_nombre'
                                    onChange={(e) => {
                                        this.setState({examen_seleccionado: examenes_entidad_list[e]})
                                    }}
                                    value={this.state.examen_seleccionado}
                                    options={mis_examenes}
                                    placeholder='Adiccionar Examen...'
                                    simpleValue
                                />


                            </div>
                            {
                                examen_seleccionado &&
                                <div className="col-3">
                                    <span className='btn btn-primary'
                                          onClick={() => adicionarExamen(examen_seleccionado)}>
                                        Adicionar
                                    </span>
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