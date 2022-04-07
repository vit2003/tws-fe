import { combineReducers } from 'redux'
import accountReducer from './account';
import groupReducer from './group';
import postReducer from './post';
import proposalReducer from './proposal';

const rootReducer = combineReducers({ 
    account: accountReducer,
    group: groupReducer,
    post: postReducer,
    proposal: proposalReducer,
});

export default rootReducer;
