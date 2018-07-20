import React, {Component} from 'react';
import FormExamenEstandar from './examen_estandar_form';
import FormCitologia from './especiales/citologia_form';
import FormBiopsia from './especiales/biopsia_form';


class Form extends Component {
    componentDidMount() {
        const {
            item_seleccionado,
            fetchCitologia,
            fetchBiopsia,
            noCargando,
            cargando,
            notificarErrorAjaxAction
        } = this.props;
        if (item_seleccionado.citologia) {
            cargando();
            fetchCitologia(item_seleccionado.citologia, () => noCargando(), notificarErrorAjaxAction);
        }
        if (item_seleccionado.biopsia) {
            cargando();
            fetchBiopsia(item_seleccionado.biopsia, () => noCargando(), notificarErrorAjaxAction);
        }
    }

    render() {
        const {
            item_seleccionado,
            citologias_list,
            biopsias_list,
        } = this.props;
        const es_estandar = !item_seleccionado.especial;
        const es_citologia = (item_seleccionado.nro_plantilla === 2 && item_seleccionado.especial);
        const es_biopsia = (item_seleccionado.nro_plantilla === 1 && item_seleccionado.especial);
        const desabilitado = item_seleccionado.examen_estado > 0;
        return (
            <div>
                {es_estandar && <FormExamenEstandar disabled={desabilitado} {...this.props}/>}
                {
                    es_citologia && citologias_list[item_seleccionado.citologia] &&
                    <FormCitologia
                        {...this.props}
                        disabled={desabilitado}
                        citologia={citologias_list[item_seleccionado.citologia]}
                    />
                }
                {
                    es_biopsia && biopsias_list[item_seleccionado.biopsia] &&
                    <FormBiopsia
                        {...this.props}
                        disabled={desabilitado}
                        biopsia={biopsias_list[item_seleccionado.biopsia]}
                    />
                }
            </div>
        )
    }
}

export default Form;