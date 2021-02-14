import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Broadcasts(props) {
    let content = [];

    const prepareBroadcasts = () => {
        if(props.broadcasts != null) {
            for (let i = 0; i < props.broadcasts.length; i++) {
                let broadcast = props.broadcasts[i]

                content.push(<TableElement id={broadcast.id} template={broadcast.data.template} date={broadcast.data.date} numberUsersSuccess={broadcast.data.numberUsersSuccess} numberUsersFailed={broadcast.data.numberUsersFailed} />)
            }
        }
    }

    prepareBroadcasts();

   return (
        <>

            <div>
                <br/>
                <p>This is a list off all the broadcast messages that were sent with the bot.</p>
                <Table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Template</th>
                        <th scope="col">Date</th>
                        <th scope="col">Number of users success</th>
                        <th scope="col">Number of users failed</th>
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

export function TableElement(props) {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.template}</td>
            <td>{new Date(props.date).toLocaleDateString()}</td>
            <td>{props.numberUsersSuccess}</td>
            <td>{props.numberUsersFailed}</td>
            <td>
                <BroadcastModal id={props.id} template={props.template} date={props.date} numberUsersSuccess={props.numberUsersSuccess} numberUsersFailed={props.numberUsersFailed} >Show details</BroadcastModal>
            </td>
        </tr>
    )
}

function BroadcastModal(props) {
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
                    <Modal.Title>Broadcast Information {props.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="broadcastInformation">
                        <Row>
                            <Col xs={6} md={6}>
                                Template:
                            </Col>
                            <Col xs={6} md={6}>
                                {props.template}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={6}>
                                Date:
                            </Col>
                            <Col xs={6} md={6}>
                                {new Date(props.date).toLocaleDateString()}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={6}>
                                Number of Users success:
                            </Col>
                            <Col xs={6} md={6}>
                                {props.numberUsersSuccess}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={6}>
                                Number of Users failed:
                            </Col>
                            <Col xs={6} md={6}>
                                {props.numberUsersFailed}
                            </Col>
                        </Row>
                    </Container>
                    <hr />
                    <Container className="broadcastInteractions">
                        <Row>
                            <Col xs={8} md={8}>
                                Number of no interaction:
                            </Col>
                            <Col xs={4} md={4}>
                                xx
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} md={8}>
                                Number of reply not ordered:
                            </Col>
                            <Col xs={4} md={4}>
                                xx
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} md={8}>
                                Number of reply and ordered:
                            </Col>
                            <Col xs={4} md={4}>
                                xx
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} md={8}>
                                Number of errors:
                            </Col>
                            <Col xs={4} md={4}>
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
