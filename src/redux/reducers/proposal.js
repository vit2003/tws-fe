
import { PROPOSAL } from './../actions/types';

const initState = {
    error: '',
    proposal: '',
    proposals: [],
    count: ''

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
        case PROPOSAL.SET_COUNT:
            return {
                ...state,
                count: action.payload
            }
        default:
            return state
    }
}

export default proposalReducer
