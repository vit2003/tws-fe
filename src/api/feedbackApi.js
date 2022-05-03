import axioClient from './axiosClient';

const feedbackApi = {

    reply(id, content) {
        const token = axioClient.getToken();
        console.log("content: ", content)
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.putMiddleParams(`/feedbacks/${id}/reply?replyContent=${content}`)
        }
    },


};

export default feedbackApi;