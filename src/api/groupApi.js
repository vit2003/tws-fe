import axioClient from './axiosClient';

const groupApi = {

    getAllGroup() {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/groups')
        }
    },

    add(data) {

    },

    update(data) {

    },
    remove(id) {

    }
};

export default groupApi;