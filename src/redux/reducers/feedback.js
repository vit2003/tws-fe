import { FEEDBACK } from '../actions/types'

const initState = {
    error: '',
    feedbacks: [],
    count: ''
}

const feedbackReducer = (state = initState, action) => {
    switch (action.type) {
        case FEEDBACK.SET_FEEDBACKS:
            return {
                ...state,
                feedbacks: action.payload
            }
        case FEEDBACK.SET_COUNT:
            return {
                ...state,
                count: action.payload
            }
        default:
            return state
    }
}

export default feedbackReducer
