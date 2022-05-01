import Swal from 'sweetalert2';
import axioClient from '../../api/axiosClient';
import { PRIZE } from './types';



export const showPrize = (prizeId) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)

            axioClient.get(`/prizes/${prizeId}/update`)
                .then((response) => {
                    if (response)
                        dispatch(setPrize(response))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const getPrizes = (filters, loading = true) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (loading) {
            dispatch(setPrizes([]));
        }

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/prizes?pageNumber=${filters?.pageNumber}&pageSize=${filters?.pageSize}`)
                // axioClient.get(`/prizes`)
                .then((response) => {
                    console.log();
                    if (response && response.data) {
                        dispatch(setPrizes(response.data, filters));
                        // dispatch(setCount(response.count));
                    } else {
                        dispatch(setPrizes([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}


export const updatePrize = (prizeId, params) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.put(`/prizes/${prizeId}`, params)
                .then((response) => {
                    if (response) {
                        dispatch(showPrize(prizeId));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const createPrize = (params) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        const filters = {
            pageNumber: 1,
            pageSize: 9
        }
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.post('/prizes', params)
                .then((response) => {
                    if (response) {
                        dispatch(getPrizes(filters, false));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const deletePrize = (prizeId) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        const filters = {
            pageNumber: 1,
            pageSize: 9
        }
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.delete(`/prizes/${prizeId}`)
                .then((response) => {
                    if (response) {
                        dispatch(getPrizes(filters, false));
                        Swal.fire(
                            'Delete prize successfully',
                            'Click button to continute!',
                            'success'
                        )
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Something wrong!",
                    })
                })
        }
    }
}

export const setPrizes = (payload) => {
    return {
        type: PRIZE.SET_PRIZES,
        payload
    }
}

export const setCount = (payload) => {
    return {
        type: PRIZE.SET_COUNT,
        payload
    }
}

export const setPrize = (payload) => {
    return {
        type: PRIZE.SET_PRIZE,
        payload
    }
}