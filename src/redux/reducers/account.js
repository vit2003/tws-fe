import axioClient from '../../api/axiosClient';
import { ACCOUNT } from '../actions/types';
import StorageKeys from './../../constants/storage-keys';

const token = axioClient.getToken();
let infoUser = '';
if (token) {
    infoUser = JSON.parse(localStorage.getItem((StorageKeys.ACCOUNT)))
}

const initState = {
    error: '',
    role: '',
    account: '',
    accounts: [],
    infoUser: infoUser
}

const accountReducer = (state = initState, action) => {
    switch (action.type) {
        case ACCOUNT.SET_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload
            }
        case ACCOUNT.SET_ACCOUNT:
            return {
                ...state,
                role: action.payload.Role,
                account: action.payload
            }
        // case ACCOUNT.SET_INFOUSER:
        //     return {
        //         ...state,
        //         infoUser: action.payload,
        //     }
        case ACCOUNT.SET_ERROR_MESSAGE:
            return {
                ...state,
                error: action.payload
            }
        case ACCOUNT.SET_CLEAR_ERROR_MESSAGE:
            return {
                ...state,
                error: ''
            }
        default:
            return state
    }
}

export default accountReducer
