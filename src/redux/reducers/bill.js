import { BILL } from '../actions/types'

const initState = {
    error: '',
    bills: [],
    count: ''
}

const billReducer = (state = initState, action) => {
    switch (action.type) {
        case BILL.SET_BILLS:
            return {
                ...state,
                bills: action.payload
            }
        case BILL.SET_COUNT:
            return {
                ...state,
                count: action.payload
            }
        default:
            return state
    }
}

export default billReducer
