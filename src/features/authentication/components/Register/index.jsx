import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useSnackbar } from 'notistack';
import { register } from './../../../../redux/actions/login';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {

        try {
            dispatch(register(values))
                .then((success) => {
                    const { closeDialog } = props;
                    if (closeDialog) {
                        closeDialog();
                        enqueueSnackbar('Register successfully', { variant: 'success' })
                    }
                })
        } catch (error) {
            console.log('Failed to login: ', error);
            enqueueSnackbar(error.message, { variant: 'error' })
        }

    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;