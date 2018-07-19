import {FlatIconModal} from './iconos_base';
import React from 'react';
import PropTypes from "prop-types";

export const FlatIconModalCancel = (props) => {
    const {onClick} = props;
    return (
        <FlatIconModal onClick={onClick} text='Cancelar' {...props}/>
    )
};
FlatIconModalCancel.propTypes = {
    onClick: PropTypes.func
};

export const FlatIconModalDelete = (props) => {
    const {onClick} = props;
    return (
        <FlatIconModal onClick={onClick} text='Eliminar' disabled={false} {...props}/>
    )
};
FlatIconModalDelete.propTypes = {
    onClick: PropTypes.func
};