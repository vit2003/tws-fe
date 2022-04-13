
import { LOGIN } from '../actions/types';
import StorageKeys from './../../constants/storage-keys';
import axioClient from '../../api/axiosClient';


const token = axioClient.getToken();
let infoUser = '';
if (token) {
    infoUser = JSON.parse(localStorage.getItem((StorageKeys.ACCOUNT)))
}

const initState = {
    login: '',
    logout: '',
    infoUser: infoUser
}

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN.SET_LOGIN:
            return {
                ...state,
                infoUser: action.payload
            }
        case LOGIN.SET_LOGOUT:
            return {
                ...state,
                infoUser: null
            }
        case LOGIN.SET_REGISTER:
            return {
                ...state,
                infoUser: action.payload
            }

        default:
            return state
    }
}

export default loginReducer
