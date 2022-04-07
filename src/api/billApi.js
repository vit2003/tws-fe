import axioClient from './axiosClient';

const billApi = {


    createBill(data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post('/bills', data)
        }
    },

    getBillDetail(id) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.getMiddleParams('/bills', id, 'details')
        }
    },

    Accept(id,data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            console.log("accept or deny: ", data);
            return axioClient.putMiddleParams(`/bills/${id}/accept_or_deny?accept_or_deny=${data}`)
        }
    },
    Deny(id,data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.putMiddleParams(`/bills/${id}/accept_or_deny?accept_or_deny=${data}`)
        }
    },
    
    Cancel(id,data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.putMiddleParams(`/bills/${id}/accept_or_deny?accept_or_deny=${data}`)
        }
    },
    Report(id,data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.post(`/accounts/rate/bill/${id}`, data)
        }
    },
    ClosedPost(id,data) {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            return axioClient.putMiddleParams(`/bills/${id}/status?update_status=${data}`)
        }
    },
    remove(id) {

    }
};

export default billApi;