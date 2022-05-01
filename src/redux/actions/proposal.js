import axioClient from '../../api/axiosClient'
import { PROPOSAL } from './types';
import Swal from 'sweetalert2';


export const getAllProposals = () => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setProposals([]));
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get(`/proposals`)
                .then((response) => {
                    if (response && response.data) {
                        dispatch(setProposals(response.data));
                        dispatch(setCount(response.count));
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
export const disableProposal = (id) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.delete(`/proposals/${id}`)
                .then((response) => {
                    if (response) {
                        dispatch(getAllProposals());
                        Swal.fire(
                            'Delete Successfully',
                            'Click button to continute!',
                            'success'
                        )
                    } else {
                        dispatch(getAllProposals());
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Something go wrong",
                    })
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

export const setCount = (payload) => {
    return {
        type: PROPOSAL.SET_COUNT,
        payload
    }
}