import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'

const ViewHabit = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const [habits,
        setHabits] = useState([]);

        const handleDelete = (id) => {
            axios.delete(`http://localhost/api/habits/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data);
                // Remove the deleted habit from the list of habits
                setHabits(habits.filter(habit => habit.id !== id));
            }).catch(function (error) {
                console.log(error);
            });
        }
    
    useEffect(() => {
        axios
            .get('http://localhost/api/habits/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                setHabits(response.data.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const myHabits = habits.map((habit) => {
        return (
            <Col>
                <Card style={{
                    width: '18rem'
                }}>
                    <Card.Body>
                        <Card.Title>{habit.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{habit.type}</Card.Subtitle>
                        <Card.Text>{habit.description}</Card.Text>
                        <Button as={Link} to={`/UpdateHabit/${habit.id}`} variant="primary" type="submit">update</Button> _
                        <Button variant="danger" type="submit" onClick={() => handleDelete(habit.id)}>delete</Button>
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
                    <h3 className='text-center'>Your Habits</h3>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                {myHabits}
            </Row>
        </Container>
    );
};

export default ViewHabit;