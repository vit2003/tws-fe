import axioClient from '../../api/axiosClient'
import {
    BILL
} from './types'


export const getBillByStatus = (statusId, filter) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setBills([]));
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/bills/status/${statusId}?PageNumber=${filter ? filter.PageNumber : 1}&PageSize=${filter ? filter.PageSize : 9}`)
                .then((response) => {
                    if (response && response.data) {
                        dispatch(setBills(response.data));
                        dispatch(setCount(response.count));
                    } else {
                        dispatch(setBills([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const setBills = (payload) => {
    return {
        type: BILL.SET_BILLS,
        payload
    }
}

export const setCount = (payload) => {
    return {
        type: BILL.SET_COUNT,
        payload
    }
}