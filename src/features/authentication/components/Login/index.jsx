import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { login } from './../../accountSlice';
import { useSnackbar } from 'notistack';
import LoginForm from './../LoginForm/index';
import { login } from './../../../../redux/actions/login';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (values) => {

        try {
            dispatch(login(values))
                .then((success) => {
                    const { closeDialog } = props;
                    if (closeDialog) {
                        closeDialog();
                    }
                })
            // enqueueSnackbar(error.message, { variant: 'success' })
        } catch (error) {
            console.log('Failed to login: ', error);
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;