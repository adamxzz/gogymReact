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

const Login = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate(); // Get the history object from React Router

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        axios.post('http://localhost/api/auth/login', {
            // Data to be sent to the server
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
            console.log(response.data)
            props.onAuthenticated(true, token, response.data.name);
            navigate('/'); // Redirect to home page using history object
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            });
    }

    return (
        <Container className='py-5'>
            <Row>
                <Col sm={6}>
                    <h2>Login</h2>
                    <br/>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="success" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Form.Group>
                            <Form.Text className="text-muted">
                                Don't have an account with us? Register now!
                            </Form.Text>
                            <Link className="px-2" to="/Register">Register</Link>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
