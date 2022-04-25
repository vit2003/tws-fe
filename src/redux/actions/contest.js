import Swal from 'sweetalert2';
import axioClient from '../../api/axiosClient';
import { CONTEST } from './types';

export const getAllContestABC = (statusId, filtersContest) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        dispatch(setContests([]));
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/contest/status/${statusId}?PageNumber=${filtersContest ? filtersContest.PageNumber : 1}&PageSize=${filtersContest ? filtersContest.PageSize : 9}`)
                .then((response) => {
                    if (response && response.data) {
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
            axioClient.getMiddleParams('/contest', contestId, 'subscribers')
                .then((response) => {
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

export const getTop10Submissions = (contestId) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        // dispatch(setSubcribers([]));
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.getMiddleParams('/submissions', contestId, 'top10')
                .then((response) => {
                    if (response) {
                        dispatch(setTop10Submissions(response));
                    } else {
                        dispatch(setTop10Submissions([]));
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
                        text: "Something wrong!",
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
export const getPrizesForEnd = (id, loading = true) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (loading) {
            dispatch(setPrizeForEnd([]));
        }

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get('/prizes/PrizeForEnd', id)
                .then((response) => {
                    if (response) {
                        dispatch(setPrizeForEnd(response.data));
                    } else {
                        dispatch(setPrizeForEnd([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
export const getSubmissions = (id, filters, loading = true) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (loading) {
            dispatch(setSubmissions([]));
        }

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/submissions/contest/${id}/mobile?PageNumber=${filters.PageNumber}&PageSize=${filters.PageSize}`)
                .then((response) => {
                    if (response) {
                        dispatch(setSubmissions(response));
                    } else {
                        dispatch(setSubmissions([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
export const getPostOfContest = (id, filters, loading = true) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (loading) {
            dispatch(setPostOfContest([]));
        }

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.get2(`/contest/${id}/posts?PageNumber=${filters.PageNumber}&PageSize=${filters.PageSize}`)
                .then((response) => {
                    if (response) {
                        dispatch(setPostOfContest(response));
                    } else {
                        dispatch(setPostOfContest([]));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export const deletePostOfContest = (postID, contestId, filters) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.delete(`/contest/postofcontest/${postID}`)
                .then((response) => {
                    if (response) {
                        dispatch(getPostOfContest(contestId, filters, false));
                        Swal.fire(
                            'Delete successfully',
                            'Click Button to continute!',
                            'success'
                        )
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}


export const approvePost = (postID, contestId, filters) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.putWithMiddleId('/submissions', postID, '1')
                .then((response) => {
                    if (response) {

                        dispatch(getSubmissions(contestId, filters, true));
                        Swal.fire(
                            'Approve successfully',
                            'Click Button to continute!',
                            'success'
                        )
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Something go wrong",
                    })
                })
        }
    }
}

export const denyPost = (postID, contestId, filters) => {
    return (dispatch) => {
        const token = axioClient.getToken();

        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.putWithMiddleId('/submissions', postID, '0')
                .then((response) => {
                    if (response) {
                        dispatch(getSubmissions(contestId, filters, true));
                        Swal.fire(
                            'Deny successfully',
                            'Click Button to continute!',
                            'success'
                        )
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Something go wrong",
                    })
                })
        }
    }
}

export const addWinner = (data, contestId) => {
    return (dispatch) => {
        const token = axioClient.getToken();
        if (token) {
            axioClient.setHeaderAuth(token)
            axioClient.put('/submissions/reward', data)
                .then((response) => {
                    if (response) {
                        dispatch(getTop10Submissions(contestId));
                        dispatch(getPrizesForEnd(contestId, true));
                        Swal.fire(
                            'Add Reward successfully',
                            'Click Button to continute!',
                            'success'
                        )
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Something go wrong",
                    })
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
export const setTop10Submissions = (payload) => {
    return {
        type: CONTEST.SET_TOP10_SUBMISSIONS,
        payload
    }
}
export const setSubmissions = (payload) => {
    return {
        type: CONTEST.SET_SUBMISSIONS,
        payload
    }
}
export const setPostOfContest = (payload) => {
    return {
        type: CONTEST.SET_POST_OF_CONTEST,
        payload
    }
}
export const setPrizeForEnd = (payload) => {
    return {
        type: CONTEST.SET_PRIZE_FOR_END,
        payload
    }
}