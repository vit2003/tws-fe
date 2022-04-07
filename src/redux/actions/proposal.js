import axioClient from '../../api/axiosClient'
import { PROPOSAL } from './types';


export const getProposalsWaiting = (loading = true) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (loading) {
            dispatch(setProposals([]));
        }
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get('/proposals/waiting')
                .then((response) => {
                    if (response && response.data) {
                        // console.log(response);
                        dispatch(setProposals(response.data));
                    } else {
                        dispatch(setProposals([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const getProposalDetail = (proposalId) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)

            axioClient.get(`/contest/create/proposal/${proposalId}`)
                .then((response) => {
                    if (response)
                    dispatch(setProposal(response))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const getBrand = () => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)

            axioClient.get('/contest/create/brand')
                .then((response) => {
                    if (response)
                    dispatch(setBrand(response))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const getType = () => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)

            axioClient.get('/contest/create/type')
                .then((response) => {
                    if (response)
                    dispatch(setType(response))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const setProposals = (payload) => {
    return {
        type: PROPOSAL.SET_PROPOSALS,
        payload
    }
}

export const setProposal = (payload) => {
    return {
        type: PROPOSAL.SET_PROPOSAL,
        payload
    }
}

export const setBrand = (payload) => {
    return {
        type: PROPOSAL.SET_BRANDS,
        payload
    }
}

export const setType = (payload) => {
    return {
        type: PROPOSAL.SET_TYPES,
        payload
    }
}