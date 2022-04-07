import axioClient from '../../api/axiosClient'
import {
    POST
} from './types'

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
                    console.log(response)
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

export const getPostsWaiting = (loading = true) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (loading) {
            dispatch(setPosts([]));
        }

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get('/posts/waiting')
                .then((response) => {
                    if (response && response.data) {
                        dispatch(setPosts(response.data));
                    } else {
                        dispatch(setPosts([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const approvePost = (postID) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.put(`/posts/approve/${postID}`)
                .then((response) => {
                    if (response) {
                        dispatch(getPostsWaiting(false));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const denyPost = (postID) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.put(`/posts/deny/${postID}`)
                .then((response) => {
                    console.log(response)
                    if (response) {
                        dispatch(getPostsWaiting(false));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const deletePost = () => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get('/posts')
                .then((response) => {
                    dispatch(getPosts())
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