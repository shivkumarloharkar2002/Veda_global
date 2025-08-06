// customer/Components/Auth/Login.js

import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
// import { API_BASE_URL, googleAuth } from '../../../config/api';
import axios from 'axios';

function Loginwithgoogle() {
    const navigate = useNavigate()
    const responseGoogle = async (authResult) => {
        try {

            if (authResult) {
                const result = await axios.get(`http://localhost:5555/user/googlelogin?code=${authResult.code}`, {

                })
                console.log("result", result.data.data)
                console.log("token", result.data.jwt)

                if (result.data.data) localStorage.setItem("userdata", JSON.stringify(result.data.data))
                navigate("/home")


            }

            console.log(authResult)
        } catch (err) {
            console.log("error while requesting google", err)
            navigate("/")
        }
    }

    const googlelogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    return (
        <div>
            <button class="carpagebutton" onClick={googlelogin}>Login with Google</button>
        </div>
    );
}

export default Loginwithgoogle;
