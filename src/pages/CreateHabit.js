import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useState} from "react";
import axios from 'axios';

const CreateHabit = () => {
    const [name,
        setName] = useState('');
    const [description,
        setDescription] = useState('');
    const [type,
        setType] = useState('');
    const navigate = useNavigate(); // Get the history object from React Router
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    const handleSubmit = (e) => {
        e.preventDefault();

        // let token = localStorage.getItem('token');
        console.log(name, description, type);
        axios.post('http://localhost/api/habits/', {
            // Data to be sent to the server
            name: name,
            description: description,
            type: type
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data);
            navigate('/ViewHabit');
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    let location = useLocation();

    return (
        <Container className='py-3'>
            <Row className='py-3'>
                <Col>
                    <Button as={Link} to={`/`} variant="success">Back</Button>
                </Col>
                <Col>
                    <h3 className='text-center'>Create a Habit</h3>
                </Col>
                <Col></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Name"
                                onChange={e => setName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                onChange={e => setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className='py-2'>
                            <Form.Select aria-label="Type" onChange={e => setType(e.target.value)}>
                                {/* <Form.Control onChange={(e) => setWorkouttype(e.target.value)}/> */}
                                <option>
                                    Type</option>
                                <option value="liters">Liters</option>
                                <option value="duration">Duration</option>
                                <option value="calories">Calories</option>
                                <option value="quantity">Quantity</option>
                                <option value="yes_no">Yes or No</option>
                            </Form.Select>
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

export default CreateHabit;