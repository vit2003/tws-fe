import axioClient from './axiosClient';

const postApi = {

    getAll(id, params) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get2(`/posts/group/${id}`, { params })
        }
    },

    getAllByAccount(id, params) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get2(`/posts/account/${id}`, { params })
            // return axioClient.get2(`/posts/account/${id}?PageNumber=${params.PageNumber}&PageSize=${params.PageSize}`)

        }
    },


    get(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/posts/details', id)
        }
    },

    reactPost(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.put(`/posts/reacts/${id}`, id)
        }
    },

    reactComment(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.put(`/comments/reacts/${id}`, id)
        }
    },

    createNewPost(data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post('/posts/new', data)
        }
    },


    deletePost(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.delete(`/posts/${id}`)
        }
    },
    deleteCmt(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.delete(`/comments/${id}`)
        }
    },

    getPostImage(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/posts', id, 'images');
        }
    },
    getNumOfComment(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/posts', id, 'num_of_comment');
        }
    },
    getCmtOfPost(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/posts', id, 'comment_detail');
        }
    },

    update(data) {

    },
    remove(id) {

    }
};

export default postApi;