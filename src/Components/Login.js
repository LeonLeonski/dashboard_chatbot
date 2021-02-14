import React, {useState} from "react";

import { loginUserSuccess, useAuthState, useAuthDispatch } from '../Context'

const axios = require('axios');

export function Login(props){

    const dispatch = useAuthDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const headers = {
            'Content-Type': 'application/json'
        }

        const params = {
            "email": email,
            "password": password
        }

        axios({
            url: 'https://europe-west1-chat-bot-app-300216.cloudfunctions.net/login',
            method: 'POST',
            timeout: 5000,
            headers: headers,
            data: params
        }).then(async function (response){
            if (response.data != null) {
                let payload = {tokenId: response.data.token};

                try {
                    let response = await loginUserSuccess(dispatch, payload)
                    if (!response.tokenId) return
                    props.history.push('/dashboard')
                } catch (error) {
                    console.log(error)
                }
            }
        }).catch(function (error){
            console.log(error);
        });
    }

    return (
        <div>
            <div className="login-page">
                <div className="form">
                    <h2>Admin Interface</h2>
                    <br/>
                    <form className="login-form">
                        <input type="text" id='email' onChange={() => setEmail(document.getElementById('email').value)} value={email} placeholder="E-mail"/>
                        <input type="password" id='password' onChange={() => setPassword(document.getElementById('password').value)} value={password} placeholder="Password"/>
                        <button type={"button"} onClick={login}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
