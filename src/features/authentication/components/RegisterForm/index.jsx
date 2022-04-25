import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';

import InputField from './../../../../components/form-controls/InputFields/index';
import { useForm } from 'react-hook-form';
import PasswordField from './../../../../components/form-controls/PasswordField/index';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { makeStyles } from '@mui/styles';
// import './index.scss'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: '18px 0'
    },

    avatar: {
        margin: '0 auto',

    },

    title: {
        fontSize: '30px',
        textAlign: 'center',
        margin: '10px 0 20px 0 !IMPORTANT'
    },
    button: {

        background: 'linear-gradient(45deg, #F7FF00 30%, #DB36A4 90%)'
    },
    inputtext: {
        color: 'red'

    },
    progres: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
    }
}))


RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {

    //style cho MUI
    const classes = useStyles();

    // Validation
    const schema = yup.object().shape({
        fullName: yup.string()
            .required('Please enter your fullname')
            .test('should has at least two words', 'Please enter at least two words', (value) => {
                return value.split(' ').length >= 2;
            }),
        email: yup.string().required('Please enter your email.').email('Please enter a valid email'),
        password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 characters.'),
        retypePassword: yup.string().required("Please retype your password.").oneOf([yup.ref('password')], 'Password does not match'),

    });

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    })

    // const { isSubmitting } = form.formState;
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        const newRegister = {
            name: values.fullName,
            email: values.email,
            password: values.password
        }
        setIsSubmitting(true)
        if (onSubmit) {
            setTimeout(() => {
                setIsSubmitting(false)
            }, 2000)
            await onSubmit(newRegister);

        }

    }

    return (
        <div className={classes.root}>
            {/* {isSubmitting && <LinearProgress className={classes.progres} />} */}

            <Avatar sx={{ height: '50px', width: '50px' }} className={classes.avatar} src='/1.png'>
            </Avatar>
            <Typography className={classes.title} component="h3">
                SIGN UP
            </Typography>


            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField id="test" className={classes.inputtext} name="fullName" label="Full Name" form={form} color="#DB36A4" />
                <InputField className={classes.inputtext} name="email" label="Email" form={form} />
                <PasswordField className={classes.inputtext} name="password" label="Password" form={form} />
                <PasswordField className={classes.inputtext} name="retypePassword" label="Retype Password" form={form} />
                <Button disabled={isSubmitting} type='submit' className={classes.button} variant='contained' fullWidth>
                    SIGN UP

                </Button>

            </form>
        </div>
    );
}

export default RegisterForm;