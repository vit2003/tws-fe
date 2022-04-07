import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

AdminInputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function AdminInputField(props) {
    const { form, name, label, disabled, value, startAdornment } = props;
    const { errors } = form;

    const hasError = errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
            as={TextField}

            fullWidth
            label={label}
            startAdornment={startAdornment}
            disabled={disabled}
            variant="outlined"
            margin="normal"
            value={value}


            error={!!hasError}
            helperText={errors[name]?.message}
        />
    )
}

export default AdminInputField;