import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {useLocation} from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import {useState} from "react";
import axios from 'axios';

const CreateWorkout = () => {

    const [date,setDate] = useState(new Date());
    const [workouttype,setWorkouttype] = useState('');
    const [sets,setSets] = useState('');
    const [reps,setReps] = useState('');
    const [weight,setWeight] = useState('');
    const [duration,setDuration] = useState('');
    const [comment,setComment] = useState('');

    const navigate = useNavigate(); // Get the history object from React Router
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(date,workouttype,sets,reps,weight,duration,comment);
        axios.post('http://localhost/api/workouts/', {
            // Data to be sent to the server
            date: date,
            workouttype: workouttype,
            sets: sets,
            reps: reps,
            weight: weight,
            duration: duration,
            comment: comment,

        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data);
            navigate('/dashboard');
        }).catch(function (error) {
            console.log(error);
            });
    }
    
    let location = useLocation();

    return (
        <Container className='py-3'>
            <Row className='py-3'>
                <Col>
                    <h3 className='text-center'>Create a Workout</h3>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Form>
                        <Form.Group className='py-2' controlId="date">
                            <Form.Control
                                type="date"
                                name="date"
                                placeholder="Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className='py-2'>
                            <Form.Select aria-label="Workout Type" onChange={(e) => setWorkouttype(e.target.value)}>
                                <option>Workout Type</option>
                                <option value="bench">Bench</option>
                                <option value="squat">Squat</option>
                                <option value="deadlift">Deadlift</option>
                                <option value="shoulderpress">ShoulderPress</option>
                                <option value="bicepCurl">BicepCurl</option>

                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSets">
                            <Form.Label>Sets</Form.Label>
                            <Form.Control type="sets" placeholder="How many sets did you do?" onChange={(e) => setSets(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicReps">
                            <Form.Label>Reps</Form.Label>
                            <Form.Control type="reps" placeholder="How many reps did you do?" onChange={(e) => setReps(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicWeights">
                            <Form.Label>Weights</Form.Label>
                            <Form.Control type="weight" placeholder="Weight?" onChange={(e) => setWeight(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="duration" placeholder="Duration?" onChange={(e) => setDuration(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control as="textarea" placeholder="Comments?" rows={3} onChange={(e) => setComment(e.target.value)}/>
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

export default CreateWorkout;