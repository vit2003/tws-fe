
import axioClient from './axiosClient';

const accountApi = {
    register(data) {
        //set duong` dan~
        const url = '/auth/local/register';
        return axioClient.post(url, data);
    },
    login(data) {
        //set duong` dan~
        const url = '/accounts/login_by_system_account';
        return axioClient.post(url, data);
    },

    loginByGoogle(data) {
        const url = '/accounts/login_by_email/?firebaseToken=' + data;
        return axioClient.post(url, data);
    },

    getDetailAccountById(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/accounts/detail', id)
        }
    },

    getFollowing(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/accounts/following', id)
        }
    },

    getFollower(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/accounts/follower', id)
        }
    },

    getAll() {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/accounts')
        }
    },
};

export default accountApi;