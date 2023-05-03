import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';

import axios from 'axios';
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'

const ViewWorkout = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const [workouts,
        setWorkouts] = useState([]);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost/api/workouts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                // Remove the deleted workout from the list of workouts
                setWorkouts(workouts.filter(workout => workout.id !== id));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        axios
            .get('http://localhost/api/workouts/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                setWorkouts(response.data.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const myWorkouts = workouts.map((workout) => {
        return (
            <Col>
                <Card style={{
                    width: '18rem'
                }}>
                    <Card.Body>
                        <Card.Title>{workout.workouttype}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{workout.dates}</Card.Subtitle>
                        <Card.Text>{workout.comment}</Card.Text>

                        <ListGroup variant="flush">
                            <ListGroup.Item>Sets: {workout.sets}</ListGroup.Item>
                            <ListGroup.Item>Reps: {workout.reps}</ListGroup.Item>
                            <ListGroup.Item>Duration: {workout.duration}</ListGroup.Item>
                        </ListGroup>
                        <Button
                            as={Link}
                            to={`/UpdateWorkout/${workout.id}`}
                            variant="primary"
                            type="submit">update</Button>
                        _
                        <Button variant="danger" type="submit" onClick={() => handleDelete(workout.id)}>delete</Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    });

    return (
        <Container>
            <Row className='py-3'>
                <Col>
                    <Button as={Link} to={`/`} variant="success">Back</Button>
                </Col>
                <Col>
                    <h3 className='text-center'>Create a Workout</h3>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                {myWorkouts}
            </Row>
        </Container>
    );
};

export default ViewWorkout;