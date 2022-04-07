import axioClient from './axiosClient';

const eventApi = {

    getHighLight() {
        const token = axioClient.getToken();
        if (token) {
            let url = '/contest/highlight'
            axioClient.setHeaderAuth(token)
            return axioClient.query(url)
        }
    },

    getListContestByGroup(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/contest/group', id)
        }

        // const url = `/contest/group/${id}`;
        // return axioClient.get(url);
    },
    proposalToOpenContest(data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post('/proposals', data)
        }
    },

    getContestDetail(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/contest', id, 'details')
        }
    },

    getReward(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/contest', id, 'rewards')
        }
    },

    getPostOfContest(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/contest', id, 'posts')
        }
    },

    rating(id, data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.postWithId('/contest/rate', id, data)
        }
    },

    getBrand() {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/contest/create/brand')
        }
    },
    getType() {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/contest/create/type')
        }
    },

    update(data) {

    },
    remove(id) {

    }
};

export default eventApi;