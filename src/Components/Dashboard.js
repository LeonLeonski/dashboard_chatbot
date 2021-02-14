import React, {useState, useEffect} from "react";
import { Users } from "./Users";
import { Navigation } from "./Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useAuthState, useAuthDispatch } from '../Context'

const axios = require('axios');

export function Dashboard(props) {
    const userDetails = useAuthState();
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        let result = [];

        const headers = {
            'Content-Type': 'application/json'
        }

        const params = {
            "token": userDetails.tokenId,
        }

        await axios({
            url: 'https://europe-west1-chat-bot-app-300216.cloudfunctions.net/getUsers',
            method: 'POST',
            timeout: 5000,
            headers: headers,
            data: params
        }).then(function (response){
            result = response.data.users;
        }).catch(function (error){
            console.log(error);
        });

        return result;
    }

    useEffect( () => {
        (async () => {
            let users = await loadUsers();
            setUsers(users);
        })();
    }, [])

    return (

        <div className="App">
            <Navigation />
            <Container>
                <Row className="justify-content-center" id="users">
                    <Users users={users} />
                </Row>
            </Container>
        </div>
    );
}
