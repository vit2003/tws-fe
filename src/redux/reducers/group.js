import { GROUP } from '../actions/types'
 
const initState = {
    error: '',
    groups: []
}

const groupReducer = (state = initState, action) => {
    switch (action.type) {
        case GROUP.SET_GROUPS: 
            return {
                ...state,
                groups: action.payload
            }
        default: 
            return state
    }
}

export default groupReducer
