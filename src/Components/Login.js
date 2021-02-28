import React, {useState} from "react";

import { connect } from 'react-redux'
import { loginUserSuccess } from '../redux/actions'

const axios = require('axios');

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.login = this.login.bind(this);
        this.success = this.success.bind(this);
 
    }

    async success(response) {
        if (response.data != null) {
            let payload = {tokenId: response.data.token};

            try {
                let response = await this.props.loginUserSuccess(payload)
                if (!response.payload.tokenId) return
                this.props.history.push('/users')
            } catch (error) {
                console.log(error)
            }
        }
    }

    async login() {
        const headers = {
            'Content-Type': 'application/json'
        }

        const params = {
            "email": this.state.email,
            "password": this.state.password
        }

        axios({
            url: 'https://europe-west1-chat-bot-app-300216.cloudfunctions.net/login',
            method: 'POST',
            timeout: 5000,
            headers: headers,
            data: params
        }).then((response) => {
            console.log(response);
            this.success(response)
        }    
        ).catch(function (error){
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <div className="login-page">
                    <div className="form">
                        <h2>Admin Interface</h2>
                        <br/>
                        <form className="login-form">
                            <input type="text" id='email' onChange={() => this.setState({email: document.getElementById('email').value})} value={this.state.email} placeholder="E-mail"/>
                            <input type="password" id='password' onChange={() => this.setState({password: document.getElementById('password').value})} value={this.state.password} placeholder="Password"/>
                            <button type={"button"} onClick={this.login}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

export default connect(
    null,
    { loginUserSuccess }
  )(Login)
