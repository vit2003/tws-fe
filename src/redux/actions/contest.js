import axioClient from '../../api/axiosClient'
import { CONTEST } from './types';
import Swal from 'sweetalert2';

export const getAllContestABC = (statusId, filtersContest) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setContests([]));
        if (token) {
            console.log("filtersContest: ", filtersContest);
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/contest/status/${statusId}?PageNumber=${filtersContest ? filtersContest.PageNumber : 1}&PageSize=${filtersContest ? filtersContest.PageSize : 9}`)
                .then((response) => {
                    if (response && response.data) {
                        // console.log(response);
                        dispatch(setContests(response.data));
                        dispatch(setCount(response.count));
                    } else {
                        dispatch(setContests([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const getAllSubcribers = (contestId) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        // dispatch(setSubcribers([]));

        if (token) {
            axioClient.setHeaderAuth(token)
            console.log("contestId: ", contestId);
            axioClient.getMiddleParams('/contest', contestId, 'subscribers')
                .then((response) => {
                    console.log("response: ", response);
                    if (response) {
                        dispatch(setSubcribers(response));
                    } else {
                        dispatch(setSubcribers([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const deleteSubcriber = (contestId, accountId) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.delete(`/contest/${contestId}/subscribers/${accountId}`)
                .then((response) => {
                    console.log(response)
                    if (response) {
                        dispatch(getAllSubcribers(contestId));
                        Swal.fire(
                            'Delete Successfully',
                            'Click Button to continute!',
                            'success'
                        )
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })
                })
        }
    }
}

export const addPrize = (contestId, data) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.put(`/contest/${contestId}/prizes`, data)
                .then((response) => {
                    console.log(response)
                    if (response) {
                        dispatch(getAllContestABC(2));
                        Swal.fire(
                            'Add prize Successfully',
                            'Click Button to continute!',
                            'success'
                        )
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })
                })
        }
    }
}

export const deleteContest = (contestId) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.delete(`/contest/${contestId}`)
                .then((response) => {
                    console.log(response)
                    if (response) {
                        dispatch(getAllContestABC(2));
                        Swal.fire(
                            'Delete Successfully',
                            'Click Button to continute!',
                            'success'
                        )
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })
                })
        }
    }
}
// export const getHappeningContest = (groupId, data) => {
//     return (dispatch) => {
//         const token = axioClient.getToken();
//         dispatch(setProposals([]));
//         if (token) {
//             axioClient.setHeaderAuth(token)
//             axioClient.post('/contest/group/', groupId, data)
//                 .then((response) => {
//                     if (response && response.data) {
//                         console.log(response);
//                         dispatch(setProposals(response.data));
//                     } else {
//                         dispatch(setProposals([]));
//                     }
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                 })
//         }
//     }
// }

// export const getProposalDetail = (proposalId) => {
//     return (dispatch) => {
//         const token = axioClient.getToken();

//         if (token) {
//             axioClient.setHeaderAuth(token)

//             axioClient.get(`/contest/create/proposal/${proposalId}`)
//                 .then((response) => {
//                     if (response)
//                     dispatch(setProposal(response))
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                 })
//         }
//     }
// }

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

export const getPrizesOfContest = (id, loading = true) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (loading) {
            dispatch(setPrizesOfContest([]));
        }

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.getMiddleParams('/contest', id, 'prizes')
                .then((response) => {
                    console.log("prize contest: ", response);
                    if (response) {
                        dispatch(setPrizesOfContest(response));
                    } else {
                        dispatch(setPrizesOfContest([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const setContests = (payload) => {
    return {
        type: CONTEST.SET_CONTESTS,
        payload
    }
}

export const setContest = (payload) => {
    return {
        type: CONTEST.SET_CONTEST,
        payload
    }
}

export const setBrand = (payload) => {
    return {
        type: CONTEST.SET_BRANDS,
        payload
    }
}

export const setType = (payload) => {
    return {
        type: CONTEST.SET_TYPES,
        payload
    }
}
export const setSubcribers = (payload) => {
    return {
        type: CONTEST.SET_SUBCRIBERS,
        payload
    }
}
export const setCount = (payload) => {
    return {
        type: CONTEST.SET_COUNT,
        payload
    }
}
export const setPrizesOfContest = (payload) => {
    return {
        type: CONTEST.SET_PRIZE_CONTEST,
        payload
    }
}