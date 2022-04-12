import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';


MultiInputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function MultiInputField(props) {
    const { form, name, label, disabled } = props;
    const { errors } = form;
    const hasError = errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
            as={TextField}

            label={label}
            disabled={disabled}
            variant="outlined"
            margin="normal"
            multiline
            fullWidth
            rows={4}

            error={!!hasError}
            helperText={errors[name]?.message}
        />
    );
}

export default MultiInputField;