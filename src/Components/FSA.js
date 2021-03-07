import xlsx from "xlsx"
import { saveAs } from "file-saver";
import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Tabs, Tab} from "@tarragon/swipeable-tabs";

import {Navigation} from "./Navigation";
import { connect } from 'react-redux'


const axios = require('axios');

class FSA extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            selectedTab: 'Pending'
        };

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.sendBroadcastMessageToSelected = this.sendBroadcastMessageToSelected.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.changeTab = this.changeTab.bind(this);
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

    changeTab (selectedTab){
        this.setState({selectedTab: selectedTab.label});
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

    async loadOrders () {
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

        result = [
            {
                name: 'Test User 1',
                date: '4 Feb',
                status: 'pending',
                count: 400,
                products: [
                    {
                        productName: 'Classic',
                        count: 400
                    },
                    {
                        productName: 'Supaset',
                        count: 200
                    }
                ],
                adress: 'Test adress'
            },
            {
                name: 'Test User 2',
                date: '3 Feb',
                status: 'pending',
                count: 400,
                products: [
                    {
                        productName: 'Classic',
                        count: 200
                    },
                    {
                        productName: 'Supaset',
                        count: 200
                    }
                ],
                adress: 'Test adress'
            },
            {
                name: 'Test User 1',
                date: '10 Feb',
                status: 'pending',
                count: 400,
                products: [
                    {
                        productName: 'Classic',
                        count: 400
                    },
                    {
                        productName: 'Supaset',
                        count: 400
                    }
                ],
                adress: 'Test adress'
            },
            {
                name: 'Test User 1',
                date: '28 Feb',
                status: 'pending',
                count: 400,
                products: [
                    {
                        productName: 'Classic',
                        count: 100
                    },
                    {
                        productName: 'Supaset',
                        count: 500
                    }
                ],
                adress: 'Test adress'
            }
        ];

        this.setState({orders: result});
    }

    componentDidMount() {
        this.loadOrders();
    }

   render() {
       let content = [];

       this.state.orders.forEach(( user, index ) => {
        content.push(<User user={user} onCheckboxChange={this.handleCheckboxChange} key={user.id} index={index} />);
       });

       return (
            <>
                <div className="App">
                    <div style={{backgroundColor: 'grey', height: '50px'}}>
                        <h3 style={{textAlign: 'right', fontWeight: 'bold', padding: '8px'}}>Lafarge Logo</h3>
                    </div>
                    <div className="w3-container">
                        <div style={{height: '100px'}}>
                            <h2 style={{textAlign: 'left', margin: '10px', fontWeight: 'bold'}}>Orders</h2>
                            <input type='text' style={{position: 'absolute', width: '318px', height: '43px', left: '29px', top: '110px', backgroundColor: '#CFCECE', borderRadius: '5px'}}></input>
                        </div>
                        <Tabs value={this.state.selectedTab} onChange={this.changeTab} styleProps={{barColor: 'white', headerTextColor: 'black', inkBarColor: 'white', activeInkBarColor: 'black', selectedHeaderTextColor: 'black'}}>
                            <Tab label="Pending" key={0}>
                                <ResponsiveTable list={this.state.orders} />
                            </Tab>
                            <Tab label="Fulfilled" key={1}>
                                <ResponsiveTable list={this.state.orders} />
                            </Tab>
                            <Tab label="Canceled" key={2}>
                                <ResponsiveTable list={this.state.orders} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    tokenId: state.tokenId,
  })
  
export default connect(mapStateToProps, null)(FSA);

class ResponsiveTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }
     
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
     
    onScroll = () => {
        if (
          (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
          this.props.list.length
        ) {
          this.props.onPaginatedSearch();
        }
    }

    render() {
        const { list } = this.props;
        return (
        <div className="list" style={{paddingTop: '5px'}}>
            {list.map(item => <div className="list-row" style={{width: '100%', padding: '0 2%', height: '60px'}}>
                <div style={{width: '100%', height: '40px', position: 'relative'}}>
                    <p style={{ fontSize: '20px', top: '0px', position: 'absolute', left: '10px' }}>{item.name}</p>
                    <p style={{ fontSize: '16px', top: '30px', position: 'absolute', left: '10px' }}>{item.date}</p>
                    <p style={{ fontSize: '20px', top: '12px', position: 'absolute', right: '50px' }}>{item.count} bags</p>
                </div>
                <hr />
            </div>)}
        </div>
        );
    };
}


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
