import Swal from 'sweetalert2';
import axioClient from '../../api/axiosClient';
import { TRADINGPOST } from './types';

export const getTradingPostsByGroupId = (groupID, params) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setTradingPosts([]));

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.getWithFilter('/trading_posts/group', groupID, { params })
                .then((response) => {
                    if (response.data) {
                        dispatch(setTradingPosts(response.data));
                        dispatch(setCount(response.count));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const getTradingPostsByEnableStatus = (enableId, params) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setTradingPosts([]));

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.getWithFilter('/trading_posts/Status', enableId, { params })
                .then((response) => {
                    if (response.data) {
                        dispatch(setTradingPosts(response.data));
                        dispatch(setCount(response.count));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const enablePost = (postID, enableId, params) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.put(`/trading_posts/${postID}/1`)
                .then((response) => {
                    if (response) {
                        dispatch(getTradingPostsByEnableStatus(enableId, params));
                        Swal.fire(
                            'Enable post successfully',
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
export const disablePost = (postID, enableId, params) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.put(`/trading_posts/${postID}/0`)
                .then((response) => {
                    if (response) {
                        dispatch(getTradingPostsByEnableStatus(enableId, params));
                        Swal.fire(
                            'Disable post successfully',
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
export const disablePostGroup = (postID, groupID, params) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.put(`/trading_posts/${postID}/0`)
                .then((response) => {
                    if (response) {
                        dispatch(getTradingPostsByGroupId(groupID, params));
                        Swal.fire(
                            'Disable post successfully',
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

export const setTradingPosts = (payload) => {
    return {
        type: TRADINGPOST.SET_TRADINGPOSTS,
        payload
    }
}
export const setCount = (payload) => {
    return {
        type: TRADINGPOST.SET_COUNT,
        payload
    }
}