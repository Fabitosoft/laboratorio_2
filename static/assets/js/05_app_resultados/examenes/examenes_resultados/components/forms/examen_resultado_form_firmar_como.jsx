import React, {Component} from 'react';
import Firma from './examen_resultado_form_firma';

export default class FirmarComo extends Component {
    constructor(props) {
        super(props);
        this.state = ({abierto: false})
    }

    render() {
        const {abierto} = this.state;
        const setAbierto = () => {
            this.setState((p) => {
                if (!p.abierto) {
                    this.props.fetchEspecialistas();
                }
                return {abierto: !p.abierto}
            })
        };
        return (
            <div className='col-12'>
                <div className="row">
                    {abierto &&
                    _.map(this.props.especialistas_list, e => {
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