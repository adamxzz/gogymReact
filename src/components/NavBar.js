import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

// import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'

const NavBar = (props) => {

    const handleLogout = () => {
        // Clear the user's name from state or local storage setName(null);
        props.onAuthenticated(false);
    };

    return (
        <Container fluid className='colour2 py-2'>
            <Row>
                <Col></Col>
                <Col>
                    <h1 className='text-center'>
                        <Link className='linkw' to="/">GoGym</Link>
                    </h1>
                </Col>

                <Col>
                    {props.authenticated
                        ? (
                            <ul>
                                <button onClick={handleLogout}>Logout {props.name}</button>
                            </ul>
                        )
                        : (
                            <ul>
                                <ButtonGroup>
                                    <Button as={Link} to={`/login`} variant="success">Login</Button> |
                                    <Button as={Link} to={`/register`} variant="success">Register</Button>
                                </ButtonGroup>
                            </ul>

                        )}
                </Col>
            </Row>
        </Container>
    )
}

export default NavBar