import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from 'axios';

const UpdateWorkout = () => {

    const [date,
        setDate] = useState('');
    const [workouttype,
        setWorkouttype] = useState('');
    const [sets,
        setSets] = useState('');
    const [reps,
        setReps] = useState('');
    const [weight,
        setWeight] = useState('');
    const [duration,
        setDuration] = useState('');
    const [comment,
        setComment] = useState('');
    const [workout,
        setWorkout] = useState({
        date: '',
        workouttype: '',
        sets: '',
        reps: '',
        weight: '',
        duration: '',
        comment: ''
    });

    const navigate = useNavigate(); // Get the history object from React Router
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    const {id} = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost/api/workouts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setWorkout(response.data.data);
                setDate(response.data.data.dates)
                setWorkouttype(response.data.data.workouttype)
                setSets(response.data.data.sets)
                setReps(response.data.data.reps)
                setWeight(response.data.data.weight)
                setDuration(response.data.data.duration)
                setComment(response.data.data.comment)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(date, workouttype, sets, reps, weight, duration, comment);
        axios.put(`http://localhost/api/workouts/${id}`, {
            // Data to be sent to the server
            dates: date,
            workouttype: workouttype,
            sets: sets,
            reps: reps,
            weight: weight,
            duration: duration,
            comment: comment
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data);
            navigate('/ViewWorkout');
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
                    <h3 className='text-center'>Update a Workout</h3>
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
                                defaultValue={workout.date}
                                onChange={(e) => setDate(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className='py-2'>
                            <Form.Select
                                aria-label="Workout Type"
                                defaultValue={workout.workouttype}
                                onChange={(e) => setWorkouttype(e.target.value)}>
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
                            <Form.Control
                                type="sets"
                                placeholder="How many sets did you do?"
                                defaultValue={workout.sets}
                                onChange={(e) => setSets(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicReps">
                            <Form.Label>Reps</Form.Label>
                            <Form.Control
                                type="reps"
                                defaultValue={workout.reps}
                                placeholder="How many reps did you do?"
                                onChange={(e) => setReps(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicWeights">
                            <Form.Label>Weights</Form.Label>
                            <Form.Control
                                type="weight"
                                defaultValue={workout.weight}
                                placeholder="Weight?"
                                onChange={(e) => setWeight(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="duration"
                                defaultValue={workout.duration}
                                placeholder="Duration?"
                                onChange={(e) => setDuration(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control
                                as="textarea"
                                defaultValue={workout.comment}
                                placeholder="Comments?"
                                rows={3}
                                onChange={(e) => setComment(e.target.value)}/>
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

export default UpdateWorkout;