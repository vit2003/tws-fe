import { combineReducers } from 'redux'
import accountReducer from './account';
import groupReducer from './group';
import postReducer from './post';
import contestReducer from './contest';
import tradingPostReducer from './tradingPost';
import prizeReducer from './prize';
import billReducer from './bill';
import feedbackReducer from './feedback';
import loginReducer from './login';
import proposalReducer from './proposal';

const rootReducer = combineReducers({
    account: accountReducer,
    group: groupReducer,
    post: postReducer,
    contest: contestReducer,
    tradingPost: tradingPostReducer,
    prize: prizeReducer,
    bill: billReducer,
    feedback: feedbackReducer,
    login: loginReducer,
    proposal: proposalReducer,
});

export default rootReducer;
