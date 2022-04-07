
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
const useStyles = makeStyles(theme => ({

    inputtext: {
        width: '100%',

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


SearchInputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function SearchInputField(props) {
    const { form, name, label, disabled, value } = props;
    const { errors } = form;
    const classes = useStyles();

    const hasError = errors[name];

    return (
        <Controller
            className={classes.inputtext}
            name={name}
            control={form.control}
            as={InputBase}
            placeholder="Search..."
            autoComplete='off'
            label={label}
            disabled={disabled}
            variant="outlined"
            value={value}


            error={!!hasError}
        />
    );
}

export default SearchInputField;