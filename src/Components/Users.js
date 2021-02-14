import xlsx from "xlsx"
import { saveAs } from "file-saver";
import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Users(props) {
    let content = [];

    const prepareUsers = () => {
        if(props.users != null) {
            for (let i = 0; i < props.users.length; i++) {
                let user = props.users[i]

                content.push(<User id={user.id} name={user.name} phone={user.phone} role={user.role}
                                   soId={user.soId} key={user.id}/>)
            }
        }
    }

    const handleExport = () => exportXLSX(props.users);

    prepareUsers();

   return (
        <>

            <div>
                <br/>
                <p>This is a list off all the users that are currently able to interact with the bot. </p>
                <Button variant="primary" onClick={handleExport}>Export Users</Button>
                <br/>
                <br/>
                <Table className="table">
                    <thead className="thead-light">
                    <tr>
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
        </>
    );
}

export function User(props) {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td>{props.phone}</td>
            <td>{props.role}</td>
            <td>{props.soId}</td>
            <td>
                <UserModal id={props.id} name={props.name} phone={props.phone} role={props.role}
                           soId={props.soId}>Show details</UserModal>
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
