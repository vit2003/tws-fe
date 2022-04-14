
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
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
PasswordFieldPink.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordFieldPink(props) {
    const { form, name, label, disabled } = props;
    const { errors } = form;
    const hasError = !!errors[name];
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    }

    return (
        <FormControl className={classes.inputtext} error={hasError} margin="normal" fullWidth variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Controller
                name={name}
                control={form.control}
                as={OutlinedInput}
                id={name}
                type={showPassword ? 'text' : 'password'}
                label={label}

                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }

                disabled={disabled}
            />
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>

    );
}

export default PasswordFieldPink;