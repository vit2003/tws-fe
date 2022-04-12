import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';


InputDateTimeField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputDateTimeField(props) {
    const { form,id, name, type, InputLabelProps, label, disabled } = props;
    const { errors } = form;

    const hasError = errors[name];

    return (
        <Controller
        sx={{mr: 2}}
            name={name}
            control={form.control}
            as={TextField}

            label={label}
            type={type}
            disabled={disabled}
            InputLabelProps={{shrink: true}}
            id={id}
            variant="outlined"
            margin="normal"
            // fullWidth
            rows={4}            

            error={!!hasError}
            helperText={errors[name]?.message}
        />
    );
}

export default InputDateTimeField;