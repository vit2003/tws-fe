import axioClient from '../../api/axiosClient'
import {
    FEEDBACK
} from './types'


export const getFeedback = (filter) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setFeedbacks([]));
        if (token) {
            console.log("filter: ", filter);
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/feedbacks/no_response_yet?PageNumber=${filter ? filter.PageNumber : 1}&PageSize=${filter ? filter.PageSize : 9}`)
                .then((response) => {
                    if (response && response.data) {
                        // console.log(response);
                        dispatch(setFeedbacks(response.data));
                        dispatch(setCount(response.count));
                    } else {
                        dispatch(setFeedbacks([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const setFeedbacks = (payload) => {
    return {
        type: FEEDBACK.SET_FEEDBACKS,
        payload
    }
}

export const setCount = (payload) => {
    return {
        type: FEEDBACK.SET_COUNT,
        payload
    }
}