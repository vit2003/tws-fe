import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { createContext, useState } from 'react';
import GoogleButton from 'react-google-button';
import { auth } from './../../../../Firebase/firebase';
import accountApi from './../../../../api/accountApi';
import { useDispatch } from 'react-redux';
import { loginByGoogle } from "../../../../redux/actions/login";

const AuthContext = createContext({
    currentUser: null
})
function AuthContextProvider({ children }) {

    const dispatch = useDispatch();
    // // onAuthStateChanged
    const [tokentId, setTokenId] = useState('');


    const LoginWithGg = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((re) => {
            console.log("re: ", re);
            setTokenId(re.user.accessToken);
            const response = accountApi.loginByGoogle(re.user.accessToken);
            dispatch(loginByGoogle(re.user.accessToken))
            console.log("response: ", response);
            // firebaseToken = tokenId;
        })
            .catch((error) => {
                console.log(error)
            })
    }

    console.log("tokentId: ", tokentId);

    return (
        <GoogleButton style={{ width: '100%', }} onClick={LoginWithGg}>
            {/* Login in with google  */}
        </GoogleButton>
    );
}

export default AuthContextProvider;