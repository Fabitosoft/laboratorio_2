import React, {Fragment} from 'react';

const InfoExamenForm = (props) => {
    const {examen} = props;
    return (
        <Fragment>
            <div className="col-12">
                <div className="row">
                    <div className="col-md-4">
                        <strong>Nro. Orden: </strong>{examen.nro_orden}<br/>
                    </div>
                    <div className="col-md-4">
                        <strong>Nro. Examen: </strong>{examen.nro_examen}<br/>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <strong>Examen: </strong>{examen.examen_nombre}<br/>
            </div>
            <div className="col-md-4">
                <strong>Paciente: </strong>{examen.paciente_nombre}
            </div>
            <div className="col-md-4">
                <strong>Entidad: </strong>{examen.entidad_nombre}
            </div>
        </Fragment>
    )
};

export default InfoExamenForm;