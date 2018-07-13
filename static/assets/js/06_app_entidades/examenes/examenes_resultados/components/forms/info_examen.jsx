import React, {Fragment} from 'react';

const InfoExamenForm = (props) => {
    const {examen} = props;
    return (
        <Fragment>
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