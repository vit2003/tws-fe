import { TRADINGPOST } from './../actions/types';

const initState = {
    error: '',
    tradingPosts: [],
    count: ''
}

const tradingPostReducer = (state = initState, action) => {
    switch (action.type) {
        case TRADINGPOST.SET_TRADINGPOSTS:
            return {
                ...state,
                tradingPosts: action.payload
            }
        case TRADINGPOST.SET_COUNT:
            return {
                ...state,
                count: action.payload
            }
        default:
            return state
    }
}

export default tradingPostReducer
