import React, {Component} from 'react';
import Firma from './examen_resultado_form_firma';

export default class FirmarComo extends Component {
    constructor(props) {
        super(props);
        this.state = ({abierto: false})
    }

    render() {
        const {abierto} = this.state;
        const {
            examen,
            especialistas_list
        } = this.props;
        const setAbierto = () => {
            this.setState((p) => {
                if (!p.abierto) {
                    this.props.fetchEspecialistas();
                }
                return {abierto: !p.abierto}
            })
        };
        const especialistas_firmas_actuales = examen.mis_firmas.map(e => e.especialista);
        const especialistas_disponibles_firma = _.pickBy(especialistas_list, e => !especialistas_firmas_actuales.includes(e.id));
        return (
            <div className='col-12'>
                <div className="row">
                    {abierto &&
                    _.map(especialistas_disponibles_firma, e => {
                        return <Firma
                            firmar_como={true}
                            key={e.id}
                            firma={{
                                ...e,
                                firmado_por: e.full_name,
                                especialidad: e.especialidad_nombre,
                                especialista: e.id
                            }}
                            {...this.props}
                        />
                    })
                    }
                </div>
                {<span onClick={setAbierto} className='puntero'>
                    {!abierto ? 'Firmar como...' : 'Ocultar firmas especialistas'}
                </span>
                }
            </div>
        )
    }
};