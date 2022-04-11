import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountApi from './../../api/accountApi';
import StorageKeys from './../../constants/storage-keys';
import { axioClient } from './../../api/axiosClient';


// Async acction register
export const register = createAsyncThunk(
    'account/register',
    async (payload) => {
        //call api to register
        const data = await accountApi.register(payload);
        //save data to localstorage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(data.user));
        //return user data
        return data.user;
    }
)


// Async acction Login
export const login = createAsyncThunk(
    'account/login',
    async (payload) => {
        //call api to register
        const data = await accountApi.login(payload);
        let obj = data ? data : data.data
        //save data to localstorage
        axioClient.saveToken(obj.token)
        localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(obj));
        //return user data
        return obj
    }
)

export const logout2 = createAsyncThunk(
    'account/logout',
    async (payload) => {
        localStorage.removeItem(StorageKeys.TOKEN);
        localStorage.removeItem(StorageKeys.ACCOUNT);
        state.current = null;
        return payload.push('/')
    }
)


// export const logout2 = () => {
//     localStorage.removeItem(StorageKeys.TOKEN);
//     localStorage.removeItem(StorageKeys.ACCOUNT);
//     state.current = null;
// }



const accountSlice = createSlice({

    name: 'account',

    initialState: {
        current: JSON.parse(localStorage.getItem((StorageKeys.ACCOUNT))) || null,
    },
    reducers: {
        logout(state) {
            console.log("state: ", state);
            //clear local storage
            localStorage.removeItem(StorageKeys.TOKEN);
            localStorage.removeItem(StorageKeys.ACCOUNT);
            //reset current
            state.current = null;
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;

        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    }
});

const { actions, reducer } = accountSlice;

export const { logout } = actions;
export default reducer;