import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import '../App.css';

import {Link} from 'react-router-dom'
import { useNavigate  } from 'react-router-dom';

import {useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate(); // Get the history object from React Router

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        axios.post('http://localhost/api/auth/register', {
            // Data to be sent to the server
            name: name,
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'content-type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {
            const token = response.data.token;
            // Store the token in state or local storage for future use
            navigate('/'); // Redirect to home page using history object
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            });
    }

    return (
        <Container  className='py-5'>
            <Row>
                <Col sm={6}>
                    <h2>Register with us!</h2>
                    <br/>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Name" onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="success" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
};

export default Register;