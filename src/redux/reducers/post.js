import { POST } from '../actions/types'
 
const initState = {
    error: '',
    posts: []
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case POST.SET_POSTS: 
            return {
                ...state,
                posts: action.payload
            }
        default: 
            return state
    }
}

export default postReducer
