
import axioClient from './axiosClient';

const accountApi = {
    register(data) {
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

    unFollowAccount(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/accounts/follow_or_unfollow/${id}`, id)
        }
    },
    followAccount(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/accounts/follow_or_unfollow/${id}`, id)
        }
    },

    editAccount(id, params) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.put(`/accounts/${id}/profile`, params)
        }
    },

    changePassword(params) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.put('accounts/change_password', params)
        }
    },


    updateRole(id, role) {
        const token = axioClient.getToken();

        let url = '';
        if (role == 1) {
            url = `/accounts/${id}/role/manager`;
        }

        if (role == 2) {
            url = `/accounts/${id}/role/member`;
        }

        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.put(url)
        }
    },
};

export default accountApi;