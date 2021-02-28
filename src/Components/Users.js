import xlsx from "xlsx"
import { saveAs } from "file-saver";
import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {Navigation} from "./Navigation";
import { connect } from 'react-redux'


const axios = require('axios');

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
        };

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.sendBroadcastMessageToSelected = this.sendBroadcastMessageToSelected.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
    }

    //TODO check if user is signed in with this.props.tokenId

    handleCheckboxChange (id) {
        const newUsers = this.state.users.map((item) => {
            if (item.id === id) {
              const updatedUsers = {
                ...item,
                isSelected: !item.isSelected,
              };
       
              return updatedUsers;
            }
       
            return item;
          });
       
          this.setState({users: newUsers});
      }

    async sendBroadcastMessageToSelected () {
        let selectedUsers = [];

        this.state.users.forEach(( user, index ) => {
            if (user.isSelected) {
                selectedUsers.push(user.id);
            }
        });

        if (selectedUsers.length > 0) {
            console.log(selectedUsers);

            let result = [];

            const headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }

            const params = {
                "apiCall": "sendBroadcast",
                "data": selectedUsers
            }

            await axios({
                url: 'http://localhost:5001/chat-bot-app-staging-305209/us-central1/apiGateway',
                //url: 'https://europe-west1-chat-bot-app-300216.cloudfunctions.net/getUsers',
                method: 'POST',
                timeout: 5000,
                headers: headers,
                data: "apiCall=getUsers"
            }).then(function (response){
                result = response.data;
            }).catch(function (error){
                console.log(error);
            });

            alert(result);
        } else {
            alert('no user selected');
        }
    }

    async loadUsers () {
        let result = [];

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        const params = {
            "apiCall": "getUsers"
        }

        await axios({
            url: 'http://localhost:5001/chat-bot-app-staging-305209/us-central1/apiGateway',
            //url: 'https://europe-west1-chat-bot-app-300216.cloudfunctions.net/getUsers',
            method: 'POST',
            timeout: 5000,
            headers: headers,
            data: "apiCall=getUsers"
        }).then(function (response){
            result = response.data;
        }).catch(function (error){
            console.log(error);
        });

        this.setState({users: result});
    }
    


    handleExport = () => exportXLSX(this.props.users);

    componentDidMount() {
        this.loadUsers();
    }

   render() {
       let content = [];

       this.state.users.forEach(( user, index ) => {
        content.push(<User user={user} onCheckboxChange={this.handleCheckboxChange} key={user.id} index={index} />);
       });

       return (
            <>
                <div className="App">
                    <Navigation />
                    <Container>
                        <Row className="justify-content-center" id="users">
                            <div>
                                <br/>
                                <p>This is a list off all the users that are currently able to interact with the bot. </p>
                                <Button variant="primary" onClick={this.handleExport}>Export Users</Button>
                                <br/>
                                <Button variant="primary" onClick={this.sendBroadcastMessageToSelected}>Send broadcast to selected users</Button>
                                <br/>
                                <br/>
                                <Table className="table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Select</th>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone number</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">SO ID</th>
                                        <th scope="col">More Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {content}
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    tokenId: state.tokenId,
  })
  
export default connect(mapStateToProps, null)(Users);

export function User(props) {
    console.log(props.user);
    return (
        <tr>
             <th><input
                            name="selectedUser"
                            type="checkbox"
                            checked={props.user.selected}
                            onChange={() => props.onCheckboxChange(props.user.id)} />
            </th>
            <th scope="row">{props.user.id}</th>
            <td>{props.user.name}</td>
            <td>{props.user.phone}</td>
            <td>{props.user.role}</td>
            <td>{props.user.soId}</td>
            <td>
                <UserModal id={props.user.id} name={props.user.name} phone={props.user.phone} role={props.user.role}
                           soId={props.user.soId}>Show details</UserModal>
            </td>
        </tr>
    )
}

function UserModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show details
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Information {props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="userInformation">
                        <Row>
                            <Col xs={6} md={6}>
                                Name: {props.name}
                            </Col>
                            <Col xs={6} md={6}>
                                Phone: {props.phone}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={6}>
                                Role: {props.role}
                            </Col>
                            <Col xs={6} md={6}>
                                SO Id: {props.soId}
                            </Col>
                        </Row>
                    </Container>
                    <hr />
                    <Container className="userInteractions">
                        <Row>
                            <Col xs={6} md={6}>
                                Number of interactions:
                            </Col>
                            <Col xs={6} md={6}>
                                xx
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={6}>
                                Number of orders:
                            </Col>
                            <Col xs={6} md={6}>
                                xx
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={6}>
                                Number of broadcast messages:
                            </Col>
                            <Col xs={6} md={6}>
                                xx
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function exportXLSX(users) {
    const retailers = users.filter(user => user.role === 'retailer');
    const fsa = users.filter(user => user.role === 'fsa');
    const so = users.filter(user => user.role === 'so');
    const dealers = users.filter(user => user.role === 'dealer');
    
    const wb = xlsx.utils.book_new();
    wb.SheetNames.push('Retailers');
    wb.SheetNames.push('FSA');
    wb.SheetNames.push('Sales Officer');
    wb.SheetNames.push('Dealers');

    const ws_retailers = xlsx.utils.json_to_sheet(retailers);
    const ws_fsa = xlsx.utils.json_to_sheet(fsa);
    const ws_so = xlsx.utils.json_to_sheet(so);
    const ws_dealers = xlsx.utils.json_to_sheet(dealers);

    wb.Sheets['Retailers'] = ws_retailers;
    wb.Sheets['FSA'] = ws_fsa;
    wb.Sheets['Sales Officer'] = ws_so;
    wb.Sheets['Dealers'] = ws_dealers;

    const wbout = xlsx.write(wb, {bookType:'xlsx', type:'binary'});
    saveAs(new Blob([s2ab(wbout)], {type:"application/octet-stream"}), 'users.xlsx');
}

function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
