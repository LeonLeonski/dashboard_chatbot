import './App.css';
import React from "react";
import { AuthedPage } from "./components/AuthedPage";
import { UnAuthedPage } from "./components/UnAuthedPage";
import firebase from "firebase";
import {
    FirebaseAuthProvider,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";
import {config} from "./test-credentials.js";


function App() {
  return (
      <>
          <FirebaseAuthProvider {...config} firebase={firebase}>
              <div>
                  <IfFirebaseUnAuthed>
                      <UnAuthedPage/>
                  </IfFirebaseUnAuthed>
                  <IfFirebaseAuthed>
                      {() => <AuthedPage/>}
                  </IfFirebaseAuthed>
              </div>
          </FirebaseAuthProvider>
      </>
  );
}
export default App;



