import { combineReducers } from 'redux'
import accountReducer from './account';
import groupReducer from './group';
import postReducer from './post';
import contestReducer from './contest';
import tradingPostReducer from './tradingPost';
import prizeReducer from './prize';
import billReducer from './bill';
import feedbackReducer from './feedback';

const rootReducer = combineReducers({
    account: accountReducer,
    group: groupReducer,
    post: postReducer,
    contest: contestReducer,
    tradingPost: tradingPostReducer,
    prize: prizeReducer,
    bill: billReducer,
    feedback: feedbackReducer,
});

export default rootReducer;
