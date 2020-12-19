import './App.css';
import React from "react";
import { GetOrders } from "./orders";
import firebase from "firebase";
import {
    FirebaseAuthProvider,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";
import {config} from "./test-credentials.js";
import { State } from "react-powerplug";


function App() {


  return (
      <>
      <FirebaseAuthProvider {...config} firebase={firebase}>
          <div>
              <IfFirebaseUnAuthed>

                  <UnAuthedPage/>

              </IfFirebaseUnAuthed>
              <IfFirebaseAuthed>{() => <AuthedPage/>}</IfFirebaseAuthed>
          </div>
      </FirebaseAuthProvider>

          </>
  );
}
class AuthedPage extends React.Component{
render() {
    return (
        <div className="App">
            <div className="heading">
                <button onClick={async () => {
                    await firebase
                        .app()
                        .auth()
                        .signOut();
                }}>
                    Sign Out
                </button>
            </div>
            <div className="tables">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pending-tab" data-toggle="tab" href="#pending" role="tab"
                           aria-controls="pending" aria-selected="true">Pending</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="sent-tab" data-toggle="tab" href="#sent" role="tab"
                           aria-controls="sent" aria-selected="false">sent</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="history-tab" data-toggle="tab" href="#history" role="tab"
                           aria-controls="history" aria-selected="false">History</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="customers-tab" data-toggle="tab" href="#customers" role="tab"
                           aria-controls="customers" aria-selected="false">Customers</a>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade in active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                        <OrdersContainer state={"pending"} title={"New Orders"}/>
                    </div>
                    <div className="tab-pane fade" id="sent" role="tabpanel" aria-labelledby="sent-tab">
                        <OrdersContainer state={"sent"} title={"Sent Orders"}/>
                    </div>
                    <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                        <OrdersContainer state={"all"} title={"All Orders"}/>
                    </div>
                    <div className="tab-pane fade" id="customers" role="tabpanel" aria-labelledby="customers-tab">
                        <OrdersContainer state={"customers"} title={"All Customers"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
}


class UnAuthedPage extends React.Component{
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

                        <button

                            onClick={async () => {
                                setState({ isLoading: true, error: null });
                                await firebase
                                    .app()
                                    .auth()
                                    .signInWithEmailAndPassword("test@test.test", "testtest");
                                setState({ isLoading: false, error: null });
                            }}
                        >
                            Login with email and pass
                        </button>
                        <button

                            onClick={async () => {
                                try {
                                    setState({ isLoading: true, error: null });
                                    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                                    await firebase.auth().signInWithPopup(googleAuthProvider);
                                    // setState({ isLoading: false, error: null });
                                } catch (error) {
                                    setState({ isLoading: false, error: error });
                                }
                            }}
                        >
                            Login With Google
                        </button>
                        <button

                            onClick={async () => {
                                setState({ isLoading: true, error: null });
                                await firebase
                                    .app()
                                    .auth()
                                    .createUserWithEmailAndPassword("test2@test.test", "testtest");
                                setState({ isLoading: false, error: null });
                            }}
                        >
                            register
                        </button>
                    </div>
                )}
            </State>
        )
    }
};


export default App;

class OrdersContainer extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">{ this.props.state === "customers" ? (<span>Customer ID</span>) : (<span>Order Id</span>)}</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">{ this.props.state === "customers" ? (<span>Orders Value</span>) : (<span>Status</span>)}</th>
                        <th scope="col">Detail View</th>
                    </tr>
                    </thead>
                    <tbody>
                        <GetOrders state={this.props.state}/>
                    </tbody>
                </table>
            </div>
        );
    }
}
