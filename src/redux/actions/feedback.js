import axioClient from '../../api/axiosClient'
import {
    FEEDBACK
} from './types'


export const getFeedbackAccount = (filter) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setFeedbacks([]));
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/feedbacks/content/0/?PageNumber=${filter ? filter.PageNumber : 1}&PageSize=${filter ? filter.PageSize : 9}`)
                .then((response) => {
                    if (response && response.data) {
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
export const getFeedbackTradingPost = (filter) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setFeedbacks([]));
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/feedbacks/content/1/?PageNumber=${filter ? filter.PageNumber : 1}&PageSize=${filter ? filter.PageSize : 9}`)
                .then((response) => {
                    if (response && response.data) {
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
export const getFeedbackPost = (filter) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setFeedbacks([]));
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/feedbacks/content/2/?PageNumber=${filter ? filter.PageNumber : 1}&PageSize=${filter ? filter.PageSize : 9}`)
                .then((response) => {
                    if (response && response.data) {
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
export const getFeedbackContest = (filter) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setFeedbacks([]));
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/feedbacks/content/3/?PageNumber=${filter ? filter.PageNumber : 1}&PageSize=${filter ? filter.PageSize : 9}`)
                .then((response) => {
                    if (response && response.data) {
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

export const getRepliedback = (filter) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setFeedbacks([]));
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/feedbacks/replied?PageNumber=${filter ? filter.PageNumber : 1}&PageSize=${filter ? filter.PageSize : 9}`)
                .then((response) => {
                    if (response && response.data) {
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