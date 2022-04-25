import axioClient from './axiosClient';

const feedbackApi = {

    reply(id, content) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.put(`/feedbacks/${id}/reply`, content)
        }
    },


};

export default feedbackApi;