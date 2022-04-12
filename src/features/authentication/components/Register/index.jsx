import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { register } from './../../accountSlice';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {

    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (values) => {

        try {

            // autoset ussername = email
            values.username = values.email;

            const action = register(values);
            const resultAction = await dispatch(action);
            const account = unwrapResult(resultAction);

            // close dialog
            const {closeDialog} = props;
            if(closeDialog) {
                closeDialog();
            }

            console.log('New account', account);
            enqueueSnackbar('Register successfully', {variant: 'success'})

        } catch (error) {
            console.log('Failed to register: ', error);
            enqueueSnackbar(error.message, {variant: 'error'});
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;