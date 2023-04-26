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

        const handleDelete = (e) => {
            e.preventDefault();
    
            axios.delete('http://localhost/api/habits/${habit.id}', {
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data);
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
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>{habit.description}</Card.Text>
                        <Button as={Link} to={`/UpdateHabit/${habit.id}`} variant="primary" type="submit">update</Button> _
                        <Button variant="danger" type="submit" onClick={handleDelete}>delete</Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    });

    return (
        <Container>
            <Row>
                {myHabits}
            </Row>
        </Container>
    );
};

export default ViewHabit;