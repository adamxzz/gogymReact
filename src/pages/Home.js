import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import HeroImage from '../images/HeroImage.jpg';

import {Link} from 'react-router-dom'

const Home = (props) => {
    return (
        <Container fluid>
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
            </Row>
            <Row className="py-5">
                <Col className='col-sm'></Col>
                {props.authenticated
                    ? (
                        <Link className='linkb' to="Dashboard">Dashboard</Link>
                    )
                    : (

                        <h4>
                            GoJim is simpler way to log, track and graph your progress, designed to be more
                            intuitive than your notebook. See your progress on creative graphs.
                        </h4>
                    )}
                <Col className='col-sm'>
                    {/* <h4>
                        GoJim is simpler way to log, track and graph your progress, designed to be more
                        intuitive than your notebook. See your progress on creative graphs.
                    </h4> */}
                </Col>
                <Col className='col-sm'></Col>
            </Row>
            {/* <Row>
                <Col>
                    <Link className='linkb' to="Dashboard">Dashboard</Link>
                </Col>
                <Col>
                    <Link className='linkb' to="CreateWorkout">
                        Create a Workout
                    </Link>
                </Col>
                <Col>
                    <Link className='linkb' to="CreateHabit">
                        Create a Habit
                    </Link>
                </Col>
                <Col>
                    <Link className='linkb' to="Graph">
                        Create a Habit
                    </Link>
                </Col>
                <Col></Col>
            </Row> */}
        </Container>
    );
};

export default Home;