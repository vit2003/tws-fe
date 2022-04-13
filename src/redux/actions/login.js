import axioClient from '../../api/axiosClient'
import {
    LOGIN
} from './types'
import StorageKeys from './../../constants/storage-keys';


export const login = (params) => {
    return async (dispatch) => {
        console.log("params: ", params);
        await axioClient.post('/accounts/login_by_system_account', params)
            .then((response) => {
                axioClient.saveToken(response.token)
                localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(response));
                console.log("response: ", response);
                if (response) {
                    dispatch(setLogin(response))
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const register = (params) => {
    return async (dispatch) => {
        console.log("params: ", params);
        await axioClient.post('/accounts/AccountSystem', params)
            .then((response) => {
                console.log("register: ", response);
                // localStorage.setItem(StorageKeys.TOKEN, data.jwt);
                // localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(data.user));

                console.log("response: ", response);
                // if (response) {
                //     dispatch(setRegister(response))
                // }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const logoutAccount = (loading = true) => {
    return (dispatch) => {
        localStorage.removeItem(StorageKeys.TOKEN);
        localStorage.removeItem(StorageKeys.ACCOUNT);
        if (loading) {
            dispatch(setLogout(loading));
        }
    }
}



export const setLogin = (payload) => {
    return {
        type: LOGIN.SET_LOGIN,
        payload
    }
}
export const setLogout = (payload) => {
    return {
        type: LOGIN.SET_LOGOUT,
        payload
    }
}
export const setRegister = (payload) => {
    return {
        type: LOGIN.SET_REGISTER,
        payload
    }
}

