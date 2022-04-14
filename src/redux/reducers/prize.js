import { PRIZE } from '../actions/types'

const initState = {
    error: '',
    prizes: [],

}

const prizeReducer = (state = initState, action) => {
    switch (action.type) {
        case PRIZE.SET_PRIZES:
            return {
                ...state,
                prizes: action.payload
            }
        case PRIZE.SET_PRIZE:
            return {
                ...state,
                prize: action.payload
            }
        default:
            return state
    }
}

export default prizeReducer
