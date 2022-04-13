import axioClient from './axiosClient';

const tradingPostApi = {

    getAll(id, params) {
        console.log('params: ', params);
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getWithFilter('/trading_posts/group', id, { params })
        }
    },

    getAllByAccount(id) {
        const url = `posts/account/${id}`;
        return axioClient.get(url);
    },


    get(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/trading_posts', id, 'detail')
        }
    },

    reactPost(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.put(`/trading_posts/${id}/react`)
        }
    },

    getDataToCreateBill(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.get('/trading_posts/getdatafortradingmessage', id)
        }
    },


    getDetail(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/trading_posts', id, 'detail')
        }
    },

    createNewTradingPost(id, data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/trading_posts/group/${id}`, data)
        }
    },

    feedbackPost(id, data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/trading_posts/${id}/feedback`, data)
        }
    },

    getTradingPostImage(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/trading_posts', id, 'images');
        }
    },
    getNumOfComment(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/trading_posts', id, 'num_of_comment');
        }
    },
    getCmtOfPost(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/trading_posts', id, 'comment_detail');
        }
    },
    remove(id) {

    }
};

export default tradingPostApi;