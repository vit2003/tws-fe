import axioClient from './axiosClient';

const prizeApi = {

    getPrizeByContestId(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/contest', id,'prizes')
        }
    },
    
    add(data) {
        
    },

    update(data) {

    },
    remove(id) {

    }
};

export default prizeApi;