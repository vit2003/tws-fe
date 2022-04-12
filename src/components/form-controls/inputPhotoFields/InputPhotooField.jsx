import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';


InputPhotooField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputPhotooField(props) {
    const { form, name, label, disabled, value } = props;
    const { errors } = form;

    const hasError = errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
            as={TextField}

            fullWidth
            label={label}
            disabled={disabled}
            variant="outlined"
            margin="normal"
            value={value}
            

            error={!!hasError}
            helperText={errors[name]?.message}
        />
    );
}

export default InputPhotooField;