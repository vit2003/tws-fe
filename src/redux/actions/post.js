import axioClient from '../../api/axiosClient';
import {
    POST
} from './types';

export const getPostsByUserId = (userID) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setPosts([]));

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get('/posts/account/' + userID)
                .then((response) => {
                    if (response.data) {
                        dispatch(setPosts(response.data));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const getPostsByGroupId = (groupID) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setPosts([]));

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get('/posts/group/' + groupID)
                .then((response) => {
                    if (response.data) {
                        dispatch(setPosts(response.data));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}


export const setPosts = (payload) => {
    return {
        type: POST.SET_POSTS,
        payload
    }
}