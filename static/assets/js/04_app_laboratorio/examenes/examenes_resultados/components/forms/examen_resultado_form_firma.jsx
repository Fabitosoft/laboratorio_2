import React from 'react';

const Firma = (props) => {
    const {
        mi_cuenta,
        setSelectItem,
        initialValues,
        notificarErrorAjaxAction,
        permisos_object,
        quitarFirmaOrdenExamen,
        firmarComoOrdenExamen,
        firmar_como = false,
        firma: {
            firma_url,
            id,
            firmado_por,
            especialidad,
            especialista
        }
    } = props;
    const onClickFirmarComo = () => {
        firmarComoOrdenExamen(
            initialValues.id,
            especialista,
            (response) => {
                setSelectItem(response)
            }
            , notificarErrorAjaxAction
        );
    };

    const onQuitarFirmaClick = () => {
        quitarFirmaOrdenExamen(
            initialValues.id,
            id,
            (response) => {
                setSelectItem(response)
            }
            , notificarErrorAjaxAction
        )
    };

    return (
        <div className="col-6 col-md-2">
            <div className="row text-center">
                <div className="col-12">
                    <img className="img-fluid" src={firma_url} alt=""/>
                </div>
                <div className="col-12" style={{fontSize: '10px', marginTop: '-40px'}}>
                    {firmado_por}<br/>
                    {especialidad}
                </div>
                {
                    (
                        mi_cuenta.especialista === especialista ||
                        permisos_object.firmar_como
                    ) &&
                    initialValues.examen_estado <= 1 &&
                    !firmar_como &&
                    <span
                        style={{position: "absolute", cursor: "pointer", bottom: "5px", right: "25px"}}
                        onClick={onQuitarFirmaClick}
                    >x</span>
                }
                {firmar_como &&
                <span
                    className='btn btn-primary'
                    onClick={onClickFirmarComo}
                >
                        Firmar
                    </span>
                }
            </div>
        </div>
    )
};

export default Firma;