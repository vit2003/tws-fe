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

    const handleSubmit = async (values) => {

        try {
            dispatch(login(values))
            // const action = login(values);
            // const resultAction = await dispatch(action);
            // unwrapResult(resultAction);

            // close dialog
            const { closeDialog } = props;
            if (closeDialog) {
                closeDialog();
            }

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