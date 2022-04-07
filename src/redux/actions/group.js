 import axioClient from '../../api/axiosClient'
 import {
     GROUP
 } from './types'

export const getGroups = () => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)

            axioClient.get('/groups')
                .then((response) => {
                    if (response.length > 0) {
                        dispatch(setGroups(response))
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const deleteGroup = () => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)

            axioClient.get('/groups')
                .then((response) => {
                    dispatch(getGroups())
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const setGroups = (payload) => {
    return {
        type: GROUP.SET_GROUPS,
        payload
    }
}