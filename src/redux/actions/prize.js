import { createAsyncThunk } from '@reduxjs/toolkit';
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
        console.log("filter: ", filters)
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

export const createPrize = createAsyncThunk(
    // 'prizes',
    // async (payload) => {
    //     //call api to register
    //     const filters = {
    //         pageNumber: 1,
    //         pageSize: 9
    //     }
    //     const response = await prizeApi.createPrize(payload)
    //     if (response) {
    //         dispatch(getPrizes(filters, false));
    //     }

    // }
)

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
                    console.log(response)
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

// export const deletePost = () => {
//     return (dispatch) => {
//         const token = axioClient.getToken();

//         if (token) {
//             axioClient.setHeaderAuth(token)
//             axioClient.get('/posts')
//                 .then((response) => {
//                     dispatch(getPosts())
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                 })
//         }
//     }
// }

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