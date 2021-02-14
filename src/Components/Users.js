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

                content.push(<User id={user.id} name={user.data.name} phone={user.data.phone} role={user.data.role}
                                   soId={user.data.soId}/>)
            }
        }
    }

    prepareUsers();

   return (
        <>

            <div>
                <br/>
                <p>This is a list off all the users that are currently able to interact with the bot. </p>
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
