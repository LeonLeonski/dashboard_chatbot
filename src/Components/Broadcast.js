import React, {useState, useEffect} from "react";

import { useAuthState } from '../Context'
import {Navigation} from "./Navigation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {Broadcasts} from "./Broadcasts";
import {User} from "./Users";

const axios = require('axios');

export function Broadcast(props) {

    const userDetails = useAuthState();
    const [broadcasts, setBroadcasts] = useState([]);
    const [broadcastMessages, setBroadcastMessages] = useState([]);

    const loadBroadcasts = async () => {
        let result = [];

        const headers = {
            'Content-Type': 'application/json'
        }

        const params = {
            "token": userDetails.tokenId,
        }

        await axios({
            url: 'https://europe-west1-chat-bot-app-300216.cloudfunctions.net/getBroadcasts',
            method: 'POST',
            timeout: 5000,
            headers: headers,
            data: params
        }).then(function (response){
            result = response.data.broadcasts;
        }).catch(function (error){
            console.log(error);
        });

        return result;
    }

    const loadBroadcastMessages = async () => {
        let result = [];

        const headers = {
            'Content-Type': 'application/json'
        }

        const params = {
            "token": userDetails.tokenId,
        }

        await axios({
            url: 'https://europe-west1-chat-bot-app-300216.cloudfunctions.net/getBroadcastMessages',
            method: 'POST',
            timeout: 5000,
            headers: headers,
            data: params
        }).then(function (response){
            result = response.data.broadcastMessages;
        }).catch(function (error){
            console.log(error);
        });

        return result;
    }

    const sendBroadcast = async (broadcastMessageId) => {
        if (window.confirm("Do you really want to sent a broadcast message to all retailers?")) {
            let result = [];

            const headers = {
                'Content-Type': 'application/json'
            }

            const params = {
                "token": userDetails.tokenId,
                "broadcastMessageId": broadcastMessageId
            }

            await axios({
                url: 'https://europe-west1-chat-bot-app-300216.cloudfunctions.net/sendBroadcast',
                method: 'POST',
                timeout: 5000,
                headers: headers,
                data: params
            }).then(function (response){
                result = response.data;

                if(result) {
                    window.alert('Success');
                }
            }).catch(function (error){
                console.log(error);
                window.alert('Error')
            });
        }
    }

    useEffect( () => {
        (async () => {
            let broadcasts = await loadBroadcasts();
            setBroadcasts(broadcasts);

            let broadcastMessages = await loadBroadcastMessages();
            setBroadcastMessages(broadcastMessages);
        })();
    }, [])

    return (

        <div className="App">
            <Navigation />
            <Container>
                <Row className="justify-content-center" id="broadcasts">
                    <Broadcasts broadcasts={broadcasts} />
                </Row>
                <hr/>
                <Row className="justify-content-center" id="broadcastMessages">
                    <Col>
                        <DropDownItems broadcastMessages={broadcastMessages} sendBroadcast={sendBroadcast} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function DropDownItems(props) {
    let content = [];

    console.log(props.broadcastMessages);

    const prepareDropdown = () => {
        if(props.broadcastMessages != null) {
            for (let i = 0; i < props.broadcastMessages.length; i++) {
                content.push(<Dropdown.Item><BroadcastSendModal id={props.broadcastMessages[i].id} name={props.broadcastMessages[i].data.name}  template={props.broadcastMessages[i].data.template} templateId={props.broadcastMessages[i].data.templateId} sendBroadcast={props.sendBroadcast}/></Dropdown.Item>);
            }
        }
    }

    prepareDropdown();

    return (
        <DropdownButton id="dropdown-basic-button" title="Select Broadcast Message">
            {content}
        </DropdownButton>
    );
}

function BroadcastSendModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {props.name}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.template}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {handleClose(); props.sendBroadcast(props.id)}}>
                        Send Message
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
