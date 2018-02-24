import React, {Fragment} from 'react';
import {upper, lower} from "../../../common";
import {Field} from 'redux-form';
import PropTypes from "prop-types";
import {
    TextField,
    Checkbox
} from 'redux-form-material-ui'
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import momentLocaliser from 'react-widgets-moment';
import moment from 'moment-timezone';

moment.tz.setDefault("America/Bogota");
momentLocaliser(moment);

export const MyTextFieldSimple = (props) => {
    let normalize = null;
    if (props.case === 'U') {
        normalize = upper
    } else if (props.case === 'L') {
        normalize = lower
    }
    return (
        <Field
            {...props}
            component={TextField}
            hintText={props.nombre}
            autoComplete="off"
            className={`${props.className}`}
            floatingLabelText={props.nombre}
            normalize={normalize}
        />
    )
};
MyTextFieldSimple.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    nombre: PropTypes.string
};


export const MyCheckboxSimple = (props) => {
    const {onClick} = props;
    return (
        <Field
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            {...props}
            component={Checkbox}
            label={props.nombre}
            normalize={v => !!v}
        />
    )
};
MyCheckboxSimple.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    nombre: PropTypes.string
};

const renderDateTimePicker = ({input: {onChange, value}, showTime}) => {
    const now = moment();
    return (
        <DateTimePicker
            onChange={onChange}
            format="YYYY-MM-DD"
            time={false}
            max={new Date()}
            value={!value ? null : new Date(value)}
        />
    )
};

export const MyDateTimePickerField = (props) => {
    return (
        <Fragment>
            <label>{props.nombre}</label>
            <Field
                {...props}
                type="date"
                fullWidth={true}
                label={props.nombre}
                component={renderDateTimePicker}
            />
        </Fragment>
    )
};

MyDateTimePickerField.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    nombre: PropTypes.string
};