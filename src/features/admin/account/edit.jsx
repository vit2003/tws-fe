import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as yup from "yup";
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateRole, showAccount } from '../../../redux/actions/account';

export default function EditAccount() {
    const state = useSelector(state => state.account);
    const [role, setRole] = useState('')
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const userID = params.id;
    console.log("params: ", params);


    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const updateRoleAccount = () => {
        dispatch(updateRole(userID, role))
    }

    useEffect(() => {
        const userID = params.id;
        if (userID) {
            dispatch(showAccount(userID))
        }
    }, [])

    return (
        <>
            <div className="title-page">
                <ManageAccountsIcon />
                <span>Edit account</span>
            </div>

            <div className="card-box-custom">
                <form>
                    <div className="form-group">
                        <FormControl fullWidth>
                            <InputLabel id="select-role">Role</InputLabel>
                            <Select
                                labelId="select-role"
                                value={role}
                                label="Role"
                                onChange={handleChange}
                            >
                                <MenuItem value={0} selected={state.infoUser.Role == 0}>Admin</MenuItem>
                                <MenuItem value={1} selected={state.infoUser.Role == 1}>Manager</MenuItem>
                                <MenuItem value={2} selected={state.infoUser.Role == 2}>Member</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" onClick={() => updateRoleAccount()}>
                            <SaveIcon />
                            <span>Save</span>
                        </Button>
                        <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => history.push('/admin/account')}>
                            <SettingsBackupRestoreIcon />
                            <span>Back</span>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
