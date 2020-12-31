import React from "react";
import firebase from "firebase";
import {State} from "react-powerplug";

export class UnAuthedPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', signMode: true};


        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlerPasswordChange = this.handlerPasswordChange.bind(this);
        this.handlerSignMode = this.handlerSignMode.bind(this);

    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlerPasswordChange(event){
        this.setState({password: event.target.value});
    }

    handlerSignMode(){
        console.log("hello?")
        var active = this.state.signMode;
        var newActive = active === true ? false : true;
        this.setState({
            signMode: newActive
        });
        console.log(this.state.signMode)
    }

    render (){
        return(
            <State initial={{ isLoading: false, error: null }}>
                {({ state, setState }) => (
                    <div>
                        <div>isLoading : {JSON.stringify(state.isLoading)}</div>
                        <div>error : {JSON.stringify(state.error)}</div>
                        <div className="login-page">
                            <div className="form">

                                {this.state.signMode === false ? (
                                    <form className="register-form">
                                        <input type="text" placeholder="name"/>
                                        <input type="text" onChange={this.handleUsernameChange}  value={this.state.username} placeholder="email address"/>
                                        <input type="password" onChange={this.handlerPasswordChange} value={this.state.password} placeholder="password"/>
                                        <button type={"button"} onClick={async () => {
                                            setState({ isLoading: true, error: null });
                                            await firebase
                                                .app()
                                                .auth()
                                                .createUserWithEmailAndPassword(this.state.username, this.state.password);
                                            setState({ isLoading: false, error: null });
                                        }}>create</button>
                                        <p className="message">Already registered? <a onClick={this.handlerSignMode}>Sign In</a></p>
                                    </form>
                                ) : (
                                    <form className="login-form">
                                        <input type="text" onChange={this.handleUsernameChange} value={this.state.username} placeholder="E-mail"/>
                                        <input type="password" onChange={this.handlerPasswordChange} value={this.state.password} placeholder="Password"/>
                                        <button type={"button"} onClick={async () => {
                                            try{
                                                setState({isLoading: true, error: null});
                                                await firebase
                                                    .app()
                                                    .auth()
                                                    .signInWithEmailAndPassword(this.state.username, this.state.password);
                                                //etState({ isLoading: false, error: null, username: '' , password: ''});
                                            }catch (error) {
                                                setState({isLoading: false, error: error});
                                            }
                                        }}>login</button>
                                        <div className="google-btn" onClick={async () => {
                                            //try {
                                            setState({ isLoading: true, error: null });
                                            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                                            await firebase.auth().signInWithPopup(googleAuthProvider);
                                            setState({ isLoading: false, error: null });
                                            /*} catch (error) {
                                                setState({ isLoading: false, error: error });
                                            }*/
                                        }}>
                                            <img className="google-icon"
                                                 src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>

                                        </div>
                                        <p className="message">Not registered? <a onClick={this.handlerSignMode}>Create an account</a></p>
                                    </form>
                                )}

                            </div>
                        </div>
                    </div>
                )}
            </State>
        )
    }
};