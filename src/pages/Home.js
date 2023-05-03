import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import HeroImage from '../images/HeroImage.jpg';

import {Link} from 'react-router-dom'

const Home = (props) => {
    return (
        <Container fluid>
            <Row>
                {props.authenticated
                    ? (
                        <Container className='py-5'>
                            <Row className='py-5'>
                                <Col>
                                    <h3 className='text-center'>Dashboard</h3>
                                </Col>
                            </Row>

                            <Row className="justify-content-md-center py-5">
                                <Col></Col>
                                <Col>
                                    <ButtonGroup>
                                        <Button as={Link} to={`/CreateHabit`} variant="success">Create a Habit</Button>
                                        |
                                        <Button as={Link} to={`/ViewHabit`} variant="outline-success">View Habits</Button>
                                    </ButtonGroup>
                                </Col>
                                <Col>
                                <ButtonGroup>
                                        <Button as={Link} to={`/CreateWorkout`} variant="success">Create a Workout</Button>
                                        |
                                        <Button as={Link} to={`/ViewWorkout`} variant="outline-success">View Workouts</Button>
                                    </ButtonGroup>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row className='py-5'>
                                <Col></Col>
                                <Col md="auto">
                                    <Button as={Link} to={`/Graph`} variant="outline-success">
                                        View Workout Graph
                                    </Button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    )
                    : (
                        <Row>
                            <div className="card text-bg-dark">
                                <img
                                    src={HeroImage}
                                    className="card-img"
                                    style={{
                                    objectFit: 'cover'
                                }}
                                    alt="..."
                                    height="600"/>
                                <div class="card-img-overlay">
                                    <h3>Gojim. Graph your progress with us.</h3>
                                    <Link className='linkw' to="Login">Get Started</Link>
                                </div>
                            </div>
                            <Row className="py-5">
                                <Col>
                                    <h4>
                                        GoJim is simpler way to log, track and graph your progress, designed to be more
                                        intuitive than your notebook. See your progress on creative graphs.
                                    </h4>
                                </Col>
                            </Row>

                        </Row>
                    )}
            </Row>
        </Container>
    );
};

export default Home;