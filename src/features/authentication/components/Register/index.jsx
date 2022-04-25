import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useSnackbar } from 'notistack';
import { register } from './../../../../redux/actions/login';


Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register({ closeDialog }) {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();



    const handleSubmit = (values) => {
        try {
            dispatch(register(values, closeDialog))
        } catch (error) {
            console.log('Failed to register: ', error);
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;