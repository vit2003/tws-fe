import axioClient from './axiosClient';

const toysApi = {

    getAll(params) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get2('/toys', { params })
        }
    },

    getToyByTypeName(typeName) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/toys/type', typeName)
        }
    },

    get(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/toys/details', id)
        }
    },

    add(data) {

    },

    update(data) {

    },
    remove(id) {

    }
};

export default toysApi;