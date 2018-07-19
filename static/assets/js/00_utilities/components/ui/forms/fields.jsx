import React, {Fragment} from 'react';
import {upper, lower} from "../../../common";
import {Field} from 'redux-form';
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Combobox from 'react-widgets/lib/Combobox';
import DropdownList from 'react-widgets/lib/DropdownList';

import momentLocaliser from 'react-widgets-moment';
import moment from 'moment-timezone';

moment.tz.setDefault("America/Bogota");
momentLocaliser(moment);

const renderTextField = ({input, label, meta: {touched, error, warning}, ...custom}) => {
    let new_custom = custom;
    if (touched && error) {
        new_custom = {...custom, helperText: error}
    }
    return (
        <Fragment>
            <TextField
                label={label}
                margin="normal"
                error={error && touched}
                {...input}
                {...new_custom}
                autoComplete='off'
            />
        </Fragment>
    )
};
export const MyTextFieldSimple = (props) => {
    let normalize = null;
    if (props.case === 'U') {
        normalize = upper
    } else if (props.case === 'L') {
        normalize = lower
    }
    return (
        <Field
            fullWidth={true}
            label={props.nombre}
            name={props.name}
            helperText={props.helperText}
            {...props}
            component={renderTextField}
            autoComplete="off"
            normalize={normalize}
        />
    )
};
MyTextFieldSimple.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    nombre: PropTypes.string
};

const renderRadioGroup = ({input, ...rest, nombre, meta, options, required = false, meta: {touched, error}}) => {
    return (
        <FormControl component="fieldset" error={error && touched} required={required}>
            <FormLabel component="legend">{nombre}</FormLabel>
            <RadioGroup
                aria-label="gender"
                name={nombre}
                value={input.value}
                onChange={(event, value) => input.onChange(value)}
            >
                {options.map(o => {
                    return (
                        <FormControlLabel key={o.label} value={o.value} control={<Radio/>} label={o.label}/>
                    )
                })}
            </RadioGroup>
        </FormControl>
    )
};

export const MyRadioButtonGroup = (props) => {
    return (
        <Field
            name={props.name}
            {...props}
            className='col-12'
            fullWidth={true}
            required={props.required}
            component={renderRadioGroup}>
        </Field>
    )
};
MyRadioButtonGroup.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    nombre: PropTypes.string,
    options: PropTypes.any
};

const renderCheckbox = ({input, label}) => (
    <FormControlLabel
        control={
            <Checkbox
                checked={input.value}
                onChange={(event, value) => input.onChange(value)}
            />
        }
        label={label}
    />
);

export const MyCheckboxSimple = (props) => {
    const {onClick, className} = props;
    return (
        <div className={className}>
            <Field
                onClick={() => {
                    if (onClick) {
                        onClick()
                    }
                }}
                {...props}
                name={props.name}
                component={renderCheckbox}
                label={props.nombre}
                normalize={v => !!v}
            />
        </div>
    )
};
MyCheckboxSimple.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    nombre: PropTypes.string
};

const renderDropdownList = ({input, data, valueField, textField, placeholder, onSelect, dropUp}) => {
    return (
        <DropdownList {...input}
                      data={data}
                      placeholder={placeholder}
                      valueField={valueField}
                      textField={textField}
                      onChange={input.onChange}
                      onSelect={onSelect}
                      dropUp
        />
    )
};


export const MyDropdownList = (props) => {
    const {busy = false, textField = 'name', valuesField = 'id', dropUp} = props;
    return (
        <Field
            {...props}
            component={renderDropdownList}
            valueField={valuesField}
            textField={textField}
            busy={busy}
            dropUp
        />
    )
};

const renderCombobox = ({input, data, valueField, textField, placeholder, onSelect = null, meta: {touched, error, warning}}) => {
    return (
        <Fragment>
            <Combobox {...input}
                      data={data}
                      placeholder={placeholder}
                      valueField={valueField}
                      textField={textField}
                      onChange={e => {
                          input.onChange(typeof(e) === 'string' ? e : e[valueField])
                      }}
                      onSelect={onSelect}
                      onBlur={() => input.onBlur()}
            />
            {touched && ((error && <span className='form-field-error'>{error}</span>) || (warning &&
                <span>{warning}</span>))}
        </Fragment>
    )
};


export const MyCombobox = (props) => {
    const {busy = false, textField = 'name', valuesField = 'id', autoFocus = false, onSelect, className, nombre = ''} = props;
    return (
        <div className={`${className} mt-4`}>
            <Field
                {...props}
                component={renderCombobox}
                valueField={valuesField}
                textField={textField}
                autoFocus={autoFocus}
                onChange={v => v[valuesField]}
                onSelect={onSelect}
                busy={busy}
                placeholder={nombre}
            />
        </div>
    )
};


MyCombobox.propTypes = {
    busy: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    textField: PropTypes.string,
    name: PropTypes.string,
    valuesField: PropTypes.string,
    placeholder: PropTypes.string,
    data: PropTypes.any,
};


const renderDateTimePicker = ({input: {onChange, value}, show_edad}) => {
    const now = moment();
    const fechaHoy = moment(now, "YYYY MM DD", "es");
    const fecha_nacimiento = moment(value, "YYYY MM DD", "es").tz('America/Bogota');
    const diferencia = fechaHoy.diff(fecha_nacimiento, "years");
    const edad = `${diferencia} años`;

    return (
        <Fragment>
            <DateTimePicker
                onChange={onChange}
                format="YYYY-MM-DD"
                time={false}
                max={new Date()}
                value={!value ? null : new Date(value)}
            />{show_edad && edad}
        </Fragment>
    )
};

export const MyDateTimePickerField = (props) => {
    return (
        <div className={props.className}>
            <label>{props.nombre}</label>
            <Field
                name={props.name}
                type="date"
                fullWidth={true}
                label={props.nombre}
                {...props}
                component={renderDateTimePicker}
            />
        </div>
    )
};

MyDateTimePickerField.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    nombre: PropTypes.string
};