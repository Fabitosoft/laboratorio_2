import React, {Component} from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';

class AddExamen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examen_seleccionado: null,
            nro_examen_especial: 0,
        }
    }

    componentDidMount() {
        const {noCargando, cargando, notificarErrorAjaxAction, entidad} = this.props;
        cargando();
        this.props.fetchEntidadesExamenes_por_entidad(entidad.id, () => noCargando(), notificarErrorAjaxAction);
    }

    render() {
        const {
            adicionarExamen,
            examenes_entidad_list
        } = this.props;
        const {
            examen_seleccionado,
            nro_examen_especial
        } = this.state;
        const mis_examenes = _.map(_.orderBy(examenes_entidad_list, ['examen_nombre'], ['asc']), e => e);
        const necesita_nro_especial = examen_seleccionado && (
            examen_seleccionado.nro_plantilla === 1 ||
            examen_seleccionado.nro_plantilla === 2
        );
        const puede_adicionar = (necesita_nro_especial && nro_examen_especial > 0) || (examen_seleccionado && !necesita_nro_especial);
        return (
            <div className="col-12 pt-4">
                <h5>Examenes Entidad</h5>
                {
                    mis_examenes && mis_examenes.length > 0 ?
                        <div className="row">
                            <div className="col-12 col-md-7 pt-4">
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
                                necesita_nro_especial &&
                                <div className="col-12 col-md-2">
                                    <TextField
                                        autoComplete="off"
                                        label='Nro. Int.'
                                        margin="normal"
                                        onChange={(e) => this.setState({nro_examen_especial: e.target.value})}
                                        value={nro_examen_especial}
                                        type='number'
                                    />
                                </div>
                            }
                            {
                                puede_adicionar &&
                                <div className="col-md-3 pt-4">
                                    <span className='btn btn-primary'
                                          onClick={() => {
                                              adicionarExamen({
                                                  ...examen_seleccionado,
                                                  nro_examen_especial
                                              });
                                              this.setState({nro_examen_especial: 0})
                                          }}>
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
}

export default AddExamen;