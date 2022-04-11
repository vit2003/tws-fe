import axioClient from './axiosClient';

const prizeApi = {

    getPrizeByContestId(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/contest', id,'prizes')
        }
    },
    getPrizeById(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get(`/prizes/${id}/update`)
        }
    },
    
    createPrize(data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post('/prizes', data)
        }
    },

    update(data) {

    },
    remove(id) {

    }
};

export default prizeApi;