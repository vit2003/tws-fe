import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import { showPrize } from '../../../redux/actions/prize';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import prizeApi from './../../../api/prizeApi';
import FormEdit from './formEdit';


export default function EditPrize() {
    const state = useSelector(state => state.prize);
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
                <FormEdit prize={prize} />

            </div>
        </>
    );
}
