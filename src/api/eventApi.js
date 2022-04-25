import axioClient from './axiosClient';

const eventApi = {

    getHighLight() {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/contest/highlight')
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

    getPostOfContest(id, params) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get2(`/contest/${id}/posts?PageNumber=${params.PageNumber}&PageSize=${params.PageSize}`)
        }
    },

    rating(contestId, postOfContestId, params) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/contest/${contestId}/rate/${postOfContestId}`, params)
        }
    },
    evaluateContest(contestId, params) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/contest/${contestId}/evaluate`, params)
        }
    },

    checkAttended(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/contest', id, 'attended');
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
    createNewEvent(id, data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/contest/group/${id}`, data)
        }
    },

    joinToContest(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/contest/${id}/join`)
        }
    },

    createRunnerPost(id, data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/contest/${id}/post`, data)
        }
    },

    getTop3(contestId) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get(`/contest/${contestId}/top_3`);
        }
    },

    getWishListContest(params) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get2('contest/wishlist', { params })
        }
    },

    remove(id) {

    }
};

export default eventApi;