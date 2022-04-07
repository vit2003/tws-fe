import React, { createContext, useContext,useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import { auth } from './../../../../Firebase/firebase';
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import GoogleButton from 'react-google-button'
import accountApi from './../../../../api/accountApi';
import StorageKeys from './../../../../constants/storage-keys';


AuthContextProvider.propTypes = {
    
};
const AuthContext = createContext({
    currentUser: null
})
function AuthContextProvider({children}) {

    // // onAuthStateChanged
    const [tokentId, setTokenId ] = useState('');


    const LoginWithGg = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((re) => {

            // localStorage.setItem(StorageKeys.TOKEN, re.user.accessToken);
            // localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(re.user));
            console.log(re.user);
            setTokenId(re.user.accessToken);
            // firebaseToken = tokenId;
        })
        .catch((error) => {
            console.log(error)
        })
        // const result = apiAccountService.signIn(firebaseToken);
        // iff result != null => msg success
    }

    // useEffect(() => {
    //     const getInfoUser = async () => {
    //         try {   
    //             console.log(tokentId)
    //                 const response = await accountApi.loginByGoogle(tokentId);
    //                 console.log(response)
    //         } catch (error) {
    //             console.log('Failed to login by gg: ', error);
    //         }
    //     }
    //     getInfoUser();
    // },)

    return (
        <GoogleButton style={{width: '100%',}} onClick={LoginWithGg}>
           {/* Login in with google  */}
        </GoogleButton>
    );
}

export default AuthContextProvider;