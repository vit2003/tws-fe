
import { CONTEST } from '../actions/types';
const initState = {
    error: '',
    contest: '',
    contests: [],
    brands: [],
    types: [],
    subcribers: [],
    count: '',
    prizesContest: []
}

const contestReducer = (state = initState, action) => {
    switch (action.type) {
        case CONTEST.SET_CONTESTS:
            return {
                ...state,
                contests: action.payload
            }
        case CONTEST.SET_CONTEST:
            return {
                ...state,
                contest: action.payload
            }
        case CONTEST.SET_BRANDS:
            return {
                ...state,
                brands: action.payload
            }
        case CONTEST.SET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case CONTEST.SET_SUBCRIBERS:
            return {
                ...state,
                subcribers: action.payload
            }
        case CONTEST.SET_COUNT:
            return {
                ...state,
                count: action.payload
            }
        case CONTEST.SET_PRIZE_CONTEST:
            return {
                ...state,
                prizesContest: action.payload
            }
        default:
            return state
    }
}

export default contestReducer
