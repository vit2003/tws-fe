import axioClient from './axiosClient';

const postApi = {

    getAll(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/posts/group', id)
        }
    },

    getAllByAccount(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/posts/account', id)
        }
    },


    get(id){
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/posts/details', id)
        }
    },

    reactPost(id){
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.put(`/posts/reacts/${id}`, id)
        }
    },

    createNewPost(data){
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post('/posts/new', data)
        }
    },


    deletePost(id){
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.delete(`/posts/${id}`, id)
        }
    },

    add(data) {

    },

    update(data) {

    },
    remove(id) {

    }
};

export default postApi;