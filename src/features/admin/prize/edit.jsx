import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as yup from "yup";
import { InputLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateRole, showAccount } from '../../../redux/actions/account';
import { ButtonGroup } from '@mui/material/ButtonGroup';
import AdminInputField from '../../../components/form-controls/AdminInputField/AdminInputField';
// import { showPrize } from '../../../redux/actions/prize';
import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { showPrize } from './../../../redux/actions/prize';
import prizeApi from './../../../api/prizeApi';
import FormEdit from './formEdit';
import { Button, TextField } from '@mui/material/';


export default function EditPrize() {
    const state = useSelector(state => state.prize);
    console.log("state: ", state);
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const prizeId = params.id;
    const { enqueueSnackbar } = useSnackbar();


    const [prize, setPrize] = useState({});
    useEffect(async () => {
        try {
            const result = await prizeApi.getPrizeById(prizeId);
            setPrize(result);
        } catch (error) {
            console.log("fail to get brand: ", error);
        }
    }, [])



    return (
        <>
            <div className="title-page">
                <ManageAccountsIcon />
                <span>Edit Prize</span>
            </div>

            <div className="card-box-custom">
                <FormEdit prize={prize}/>

            </div>
        </>
    );
}
