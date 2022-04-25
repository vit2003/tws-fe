import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, TextField } from '@mui/material/';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
// import EditPrize from './edit';
import { updatePrize } from '../../../redux/actions/prize';

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

    const handleEditPrize = async () => {
        try {
            const editPrize = {
                name: name,
                description: description,
                value: parseInt(value),
            }
            dispatch(updatePrize(prize.id, editPrize))
            await Swal.fire(
                'Edit prize successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log('Failed Edit Prize: ', error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
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
                <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => history.push('/manager/prize')}>
                    <SettingsBackupRestoreIcon />
                    <span>Back</span>
                </Button>
            </div>
        </form>
    );
}

export default FormEdit;