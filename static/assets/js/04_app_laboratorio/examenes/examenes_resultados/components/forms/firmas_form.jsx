import React, {Component, Fragment} from 'react';
import Firma from './examen_resultado_form_firma';
import FirmarComo from './examen_resultado_form_firmar_como';

class FirmaForm extends Component {
    renderVerificar() {
        const {
            examen,
            updateOrdenExamen,
            setSelectItem,
            notificarErrorAjaxAction
        } = this.props;
        const nuevo_estado = examen.examen_estado === 1 ? 2 : 1;

        const onClick = () => {
            updateOrdenExamen(examen.id, {...examen, examen_estado: nuevo_estado},
                response => {
                    setSelectItem(response)
                },
                notificarErrorAjaxAction
            )
        };
        return (
            <span className='btn btn-primary'
                  onClick={onClick}>{examen.examen_estado === 1 ? 'Verificar' : 'Quitar Verificado'}</span>

        )
    }

    renderColocarConResultados() {
        const {
            examen,
            updateOrdenExamen,
            setSelectItem,
            notificarErrorAjaxAction
        } = this.props;
        const nuevo_estado = examen.examen_estado === 0 ? 1 : 0;

        const onClick = () => {
            updateOrdenExamen(examen.id, {...examen, examen_estado: nuevo_estado},
                response => {
                    setSelectItem(response)
                },
                notificarErrorAjaxAction
            )
        };

        return (
            <span
                className='btn btn-primary'
                onClick={onClick}>
                        {examen.examen_estado === 0 ? 'Con Resultados' : 'Quitar Con Resultados'}
                    </span>

        )
    }

    renderFirmar() {
        const {
            examen,
            notificarErrorAjaxAction,
            setSelectItem,
            firmarOrdenExamen,
        } = this.props;
        const puede_firmar =
            (
                (!examen.multifirma && examen.mis_firmas.length === 0) ||
                examen.multifirma
            ) &&
            examen.examen_estado < 2;
        const onClick = () => {
            firmarOrdenExamen(examen.id, (r) => setSelectItem(r), notificarErrorAjaxAction)
        };

        return (
            puede_firmar &&
            <span className='btn btn-primary' onClick={onClick}>Firmar</span>
        )
    }

    render() {
        const {
            examen,
            permisos_object,
            mi_cuenta,
        } = this.props;

        const esta_verificado = examen.examen_estado > 1;
        const puede_firmar_como = permisos_object.firmar_como;
        const tiene_firmas = examen.mis_firmas.length > 0;
        const puede_verificar = permisos_object.verificar;
        const es_especialista = mi_cuenta.especialista;

        return (
            <Fragment>
                <div className="col-12">
                    <div className="row">
                        {examen.mis_firmas.map(firma => {
                            return <Firma key={firma.id} firma={firma} {...this.props}/>
                        })}
                    </div>
                </div>
                {
                    examen.examen_estado === 1 &&
                    es_especialista &&
                    this.renderFirmar()
                }
                {
                    examen.examen_estado >= 1 &&
                    puede_verificar &&
                    tiene_firmas &&
                    this.renderVerificar()
                }
                {
                    examen.examen_estado < 2 &&
                    tiene_firmas &&
                    this.renderColocarConResultados()
                }
                {
                    puede_firmar_como &&
                    examen.examen_estado < 1 &&
                    !esta_verificado &&
                    <FirmarComo especialistas_list={this.props.especialistas_list} {...this.props}/>
                }
            </Fragment>
        )
    }
}

export default FirmaForm;