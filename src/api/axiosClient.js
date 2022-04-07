import axios from "axios"
import StorageKeys from './../constants/storage-keys';

// const axioClient = axios.create({
//   // baseURL: 'https://api.ezfrontend.com/',
//   baseURL: 'https://tws-system-release.herokuapp.com/api/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

axios.defaults.baseURL = 'https://tws-system-release.herokuapp.com/api/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

export const axioClient = {
    get(url, slug = '') {
        return axios.get(`${url}/${slug}`).catch(error => console.log(error))
    },
    getMiddleParams(url, slug = '', url2) {
        return axios.get(`${url}/${slug}/${url2}`).catch(error => console.log(error))
    },
    query(url) {
        return axios.get(`${url}`).catch(error => console.log(error))
    },
    post(url, params, config) {
        return axios.post(`${url}`, params, config)
    },
    postWithId(url,slug, params, config) {
        return axios.post(`${url}/${slug}`, params, config)
    },
    postMiddleId(url,slug,url2, params, config) {
        return axios.post(`${url}/${slug}/${url2}`)
    },
    put(url, params, config) {
        return axios.put(`${url}`, params, config)
    },
    putMiddleParams(url, params, url2, slug) {
        return axios.put(`${url}`, params, `${url2}`, slug)
    },
    delete(url, params, config) {
        return axios.delete(`${url}`, params, config)
    },
    saveToken(token, expired) {
        window.localStorage.setItem('access_token', JSON.stringify(token))
    },
    getToken() {
        if (typeof window === 'undefined') {
            return null
        }
        
        return window.localStorage.getItem('access_token') ? JSON.parse(window.localStorage.getItem('access_token')) : "";
        // return window.localStorage.StorageKeys.TOKEN ? JSON.parse(window.localStorage.StorageKeys.TOKEN) : "";
    },
    setHeaderAuth(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    clearToken() {
        
    }
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data;
},

function (error) {

    // const { config, status, data } = error.response;

    // const URLs = ['/auth/local/register', '/auth/local']

    // if (URLs.includes(config.url) && status === 400) {
    //   const errorList = data.data || [];
    //   const firstError = errorList.length > 0 ? errorList[0] : {};
    //   const messageList = firstError.messages || [];
    //   const firstMessage = messageList.length > 0 ? messageList[0] : {};

    //   throw new Error(firstMessage.message)
    // }
    return Promise.reject(error);
});

export default axioClient;