import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';

import axios from 'axios';

const ViewWorkout = () => {

    axios.get('http://localhost/api/habits', {
        headers: {
            Authorization: 'Bearer '
        }
    })

    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{
                        width: '18rem'
                    }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the
                                card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewWorkout;