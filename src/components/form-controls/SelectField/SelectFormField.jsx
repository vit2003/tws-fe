
import { Select } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

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


SelectFormField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function SelectFormField(props) {
    const { form, name, label, disabled, value, children, defaultValue, labelId } = props;
    const classes = useStyles();


    return (

        <Controller
            className={classes.inputtext}
            defaultValue={defaultValue}
            name={name}
            control={form.control}
            as={
                <Select labelId={labelId} label={label}>
                    {children}
                </Select>
            }

            fullWidth
            label={label}
            disabled={disabled}
            variant="outlined"
            margin="dense"
            value={value}

        />
    );
}

export default SelectFormField;