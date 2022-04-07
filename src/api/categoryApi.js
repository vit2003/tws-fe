import axioClient from './axiosClient';

const categorysApi = {

    getAll() {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/types/type_to_conbobox')
        }
    },

    get(id) {

    },

    add(data) {

    },

    update(data) {

    },
    remove(id) {

    }
};

export default categorysApi;