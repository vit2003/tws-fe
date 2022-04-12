import { configureStore } from "@reduxjs/toolkit";
import accountReducer from '../features/authentication/accountSlice';

const rootReducer = {
    account: accountReducer,
};

const store = configureStore({
    reducer: rootReducer,
})

export default store;