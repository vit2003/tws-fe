
import { PROPOSAL } from './../actions/types';
const initState = {
    error: '',
    proposal: '',
    proposals: [],
    brands: [],
    types: [],
}

const proposalReducer = (state = initState, action) => {
    switch (action.type) {
        case PROPOSAL.SET_PROPOSALS:
            return {
                ...state,
                proposals: action.payload
            }
        case PROPOSAL.SET_PROPOSAL:
            return {
                ...state,
                proposal: action.payload
            }
        case PROPOSAL.SET_BRANDS:
            return {
                ...state,
                brands: action.payload
            }
        case PROPOSAL.SET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        default:
            return state
    }
}

export default proposalReducer
