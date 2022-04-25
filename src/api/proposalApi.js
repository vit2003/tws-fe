import axioClient from './axiosClient';

const proposalApi = {

    getAllByAccountId(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/proposals', id)
        }
    },
    deleteProposal(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.delete(`/proposals/${id}`)
        }
    },
};

export default proposalApi;