
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({

    inputtext: {
        "& .Mui-focused": {
            //    color: '#db36a4 !important',
        },
        "& .MuiFormLabel-root": {
            color: '#db36a4 !important',
        },
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline-focused': {
                borderColor: '#db36a4 !important'
            },
            '&:hover fieldset': {
                borderColor: '#db36a4 !important'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#db36a4 !important'
            },
        },

    },
}))


InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled, value } = props;
    const { errors } = form;
    const classes = useStyles();

    const hasError = errors[name];

    return (
        <Controller
            className={classes.inputtext}
            name={name}
            control={form.control}
            as={TextField}

            autoComplete='off'
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

export default InputField;