
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
        "& .MuiInputBase-root::after": {
            borderBottom: '2px solid #db36a4 !important'
        },
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline-focused': {
                borderColor: '#db36a4 !important',
                borderBottom: '#db36a4 !important'
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

InputPostField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputPostField(props) {
    const { form, name, label, disabled, value } = props;
    const classes = useStyles();

    return (
        <Controller
            className={classes.inputtext}
            name={name}
            control={form.control}
            as={TextField}

            label={label}
            disabled={disabled}
            placeholder='How are you doing?'
            fullWidth
            variant="filled"
            multiline
            rows={4}
            margin="dense"
            value={value}

        />
    );
}

export default InputPostField;