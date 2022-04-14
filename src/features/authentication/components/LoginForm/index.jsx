import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';

import InputField from './../../../../components/form-controls/InputFields/index';
import { useForm } from 'react-hook-form';
import PasswordField from './../../../../components/form-controls/PasswordField/index';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { makeStyles } from '@mui/styles';
import './styles.scss'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: '18px 0'
    },

    avatar: {
        margin: '30px auto'
    },

    button: {
        background: 'linear-gradient(45deg, #F7FF00 30%, #DB36A4 90%)'
    },
    progres: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
    }
}))


LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {

    //style cho MUI
    const classes = useStyles();

    // Validation
    const schema = yup.object().shape({

        email: yup.string().required('Please enter your email.').email('Please enter a valid email'),
        password: yup.string().required('Please enter your password'),

    });

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const { isSubmitting } = form.formState;


    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
        form.reset();
    }

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progres} />}

            <Avatar sx={{ height: '70px', width: '70px' }} className={classes.avatar} src='/1.png'>
            </Avatar>
            <Typography variant="h4" className={classes.title} className="title1">
                We are ToyWorld!!!
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle} className="title2">
                Please login to your account!!!
            </Typography>


            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField className="inputField" className={classes.inputtext} name="email" label="Email" form={form} />
                <PasswordField className={classes.inputtext} name="password" label="Password" form={form} />

                <Button disabled={isSubmitting} type='submit' className="btn-login" variant='contained' fullWidth>
                    Sign in
                </Button>

            </form>
        </div>
    );
}

export default LoginForm;