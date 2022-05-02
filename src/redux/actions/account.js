import Swal from 'sweetalert2';
import axioClient from '../../api/axiosClient';
import {

    ACCOUNT
} from './types';
/*
* Token
* - Manager: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiMSIsIkFjY291bnRJZCI6IjQiLCJuYmYiOjE2NDU4NDQzMzIsImV4cCI6MTY0NjQ1MDkzMiwiaWF0IjoxNjQ1ODQ0MzMyfQ.WLztfRoQh3HqEj9HNcVWpQM9VItgvWbo_FKngycvsB8
* - Admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiMCIsIkFjY291bnRJZCI6IjMiLCJuYmYiOjE2NDU4NDQ0OTIsImV4cCI6MTY0NjQ1MTA5MiwiaWF0IjoxNjQ1ODQ0NDkyfQ.3mVK_-MbDeeyHkqiU8X_456bmmyPFvKFFLjc4Kzy8GM
*/


export const getAccounts = (filter) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/accounts?PageNumber=${filter ? filter.PageNumber : 1}&PageSize=${filter ? filter.PageSize : 9}`)
                .then((response) => {
                    if (response.data) {
                        dispatch(setAccounts(response.data))
                        dispatch(setCount(response.count))
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const deactiveAccount = (userID) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)

            axioClient.put(`/accounts/enable_disable/${userID}`)
                .then((response) => {
                    dispatch(getAccounts())
                    Swal.fire(
                        'Update successfully',
                        'Click button to continute!',
                        'success'
                    )
                })
                .catch((error) => {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
        }
    }
}

export const showAccount = (userID) => {
    return async (dispatch) => {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            await axioClient.get(`/accounts/detail/${userID}`)
                .then((response) => {
                    if (response)
                        dispatch(setAccount(response))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const updateRole = (id, role) => {
    return async (dispatch) => {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)

            let url = '';
            if (role == 1) {
                url = `/accounts/${id}/role/manager`;
            }

            if (role == 2) {
                url = `/accounts/${id}/role/member`;
            }
            await axioClient.put(url)
                .then((response) => {
                    Swal.fire(
                        'Update role successfully',
                        'Click button to continute!',
                        'success'
                    )
                })
                .catch((error) => {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
        }
    }
}


export const setAccounts = (payload) => {
    return {
        type: ACCOUNT.SET_ACCOUNTS,
        payload
    }
}

export const setAccount = (payload) => {
    return {
        type: ACCOUNT.SET_ACCOUNT,
        payload
    }
}
export const setCount = (payload) => {
    return {
        type: ACCOUNT.SET_COUNT,
        payload
    }
}