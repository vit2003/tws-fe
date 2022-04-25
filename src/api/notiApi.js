import axioClient from './axiosClient';

const notiApi = {

    getAllByAccountId(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get2(`/Notification?ownerId=${id}&PageNumber=1&PageSize=99`)
        }
    },

    changeReaded(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.put(`/Notification/readed?id=${id}`)
        }
    },
};

export default notiApi;