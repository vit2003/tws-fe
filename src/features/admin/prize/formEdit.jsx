import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import AdminInputField from '../../../components/form-controls/AdminInputField/AdminInputField';
import { Button, TextField } from '@mui/material/';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import SaveIcon from '@mui/icons-material/Save';
import { useHistory } from 'react-router';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
// import EditPrize from './edit';
import  { updatePrize } from '../../../redux/actions/prize';
import { useDispatch } from 'react-redux';

FormEdit.propTypes = {

};


function FormEdit({ prize }) {

    const history = useHistory();

    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (prize != null) {
            setName(prize.name)
            setDescription(prize.description)
            setValue(prize.value)
        }
    }, [prize])


    const handleOnChangeName = (e) => {
        setName(e.target.value)
    }
    const handleOnChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleOnChangeValue = (e) => {
        setValue(e.target.value)
    }

    const handleEditPrize = () => {
        try {
            const editPrize = {
                name: name,
                description: description,
                value: parseInt(value),
            }
            console.log('edit Prize: ', editPrize);
            dispatch(updatePrize(prize.id, editPrize))
            enqueueSnackbar('Edit Prize successfully!!', { variant: 'success' })
        } catch (error) {
            console.log('Failed Edit Prize: ', error);
            enqueueSnackbar('Failed to Edit Prize !!', { variant: 'error' })
        }
    }

    return (
        <form>
            <div className="form-group">
                <TextField type="text" sx={{ mb: 2 }} value={name} fullWidth name='name' onChange={handleOnChangeName} />
                <TextField type="text" sx={{ mb: 2 }} value={description} fullWidth name='description' onChange={handleOnChangeDescription} />
                <TextField type="text" sx={{ mb: 2 }} value={value} fullWidth name='value' onChange={handleOnChangeValue} />
            </div>
            <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleEditPrize}>
                    <SaveIcon />
                    <span>Save</span>
                </Button>
                <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => history.push('/admin/prize')}>
                    <SettingsBackupRestoreIcon />
                    <span>Back</span>
                </Button>
            </div>
        </form>
    );
}

export default FormEdit;