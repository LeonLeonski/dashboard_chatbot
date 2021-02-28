import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";

export function Navigation(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#/users">mcomtech | Chatbot Users</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#/users">Users</Nav.Link>
                    <Nav.Link href="#/broadcast">Broadcasts</Nav.Link>
                    <Nav.Link href="#link">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
