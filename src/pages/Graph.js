import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';

import {useState, useEffect} from "react";
import axios from 'axios';

import {Link, useLocation} from 'react-router-dom'

import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    let location = useLocation();
    // const [chartData, setChartData] = useState({});
    const [labelsChart1,
        setLabelsChart1] = useState([]);
    const [weightsChart1,
        setWeightsChart1] = useState({});
    const [typeChart1,
        setTypeChart1] = useState('bench');

    const [labelsChart2,
        setLabelsChart2] = useState([]);
    const [weightsChart2,
        setWeightsChart2] = useState({});
    const [typeChart2,
        setTypeChart2] = useState('squat');

        
    const [labelsChart3,
        setLabelsChart3] = useState([]);
    const [weightsChart3,
        setWeightsChart3] = useState({});
    const [typeChart3,
        setTypeChart3] = useState('deadlift');

    const [workouts,
        setWorkouts] = useState(null);

    const optionsChart1 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: typeChart1
            }
        }
    };

    const optionsChart2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: typeChart2
            }
        }
    };

    const optionsChart3 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: typeChart3
            }
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost/api/workouts/chart/${typeChart1}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                // setChartData(response.data);
                setLabelsChart1(response.data.labels);
                setWeightsChart1(response.data.weights);
                setTypeChart1(response.data.type);

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [typeChart1]);

    useEffect(() => {
        axios
            .get(`http://localhost/api/workouts/chart/${typeChart2}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                // setChartData(response.data);
                setLabelsChart2(response.data.labels);
                setWeightsChart2(response.data.weights);
                setTypeChart2(response.data.type);

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [typeChart2]);

    useEffect(() => {
        axios
            .get(`http://localhost/api/workouts/chart/${typeChart3}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                // setChartData(response.data);
                setLabelsChart3(response.data.labels);
                setWeightsChart3(response.data.weights);
                setTypeChart3(response.data.type);

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [typeChart3]);


    useEffect(() => {
        axios
            .get(`http://localhost/api/workouts/`, {
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

    }, [typeChart2]);

    let myChart1 = (
        <h3>No chart data</h3>
    );

    if (labelsChart1.length > 0) {
        myChart1 = (<Line
            options={optionsChart1}
            datasetIdKey='id'
            data={{
            labels: labelsChart1,
            datasets: [
                {
                    ...weightsChart1,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }
            ]
        }}/>);
    }

    let myChart2 = (
        <h3>No chart data</h3>
    );

    if (labelsChart2.length > 0) {

        myChart2 = (<Line
            options={optionsChart2}
            datasetIdKey='id'
            data={{
            labels: labelsChart2,
            datasets: [
                {
                    ...weightsChart2,
                    borderColor: 'rgb(99, 255, 132)',
                    backgroundColor: 'rgba(99, 255, 132, 0.5)'
                }
            ]
        }}/>);
    }


    let myChart3 = (
        <h3>No chart data</h3>
    );

    if (labelsChart3.length > 0) {

        myChart3 = (<Line
            options={optionsChart3}
            datasetIdKey='id'
            data={{
            labels: labelsChart3,
            datasets: [
                {
                    ...weightsChart3,
                    borderColor: 'rgb(132, 99, 255)',
                    backgroundColor: 'rgba(132, 99, 255, 0.5)'
                }
            ]
        }}/>);
    }

    let myWorkouts = "Loading...";

    if (workouts) {
        myWorkouts = (
            // <Dropdown>
            //     <Dropdown.Toggle variant="success" id="dropdown-basic">
            //         Change Workout
            //     </Dropdown.Toggle>
            //     <Dropdown.Menu>

            //         {workouts.map((workouttype) => {
            //             return <Dropdown.Item key={workouttype.id} onClick={() => setTypeChart1(workouttype.workouttype)}>{workouttype.workouttype}</Dropdown.Item>

            //         })}

            //     </Dropdown.Menu>
            // </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Change Workout
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTypeChart1('bench')}>Bench</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart1('squat')}>Squat</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart1('deadlift')}>Deadlift</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart1('shoulderpress')}>Shoulder Press</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart1('bicepcurl')}>Bicep Curl</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart1('triceppulldown')}>Tricep Pulldown</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart1('treadmill')}>Treadmill</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

        );
    }

    let myWorkouts2 = "Loading...";

    if (workouts) {
        myWorkouts2 = (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Change Workout
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTypeChart2('bench')}>Bench</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart2('squat')}>Squat</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart2('deadlift')}>Deadlift</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart2('shoulderpress')}>Shoulder Press</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart2('bicepcurl')}>Bicep Curl</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart2('triceppulldown')}>Tricep Pulldown</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart2('treadmill')}>Treadmill</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

        );
    }

    let myWorkouts3 = "Loading...";

    if (workouts) {
        myWorkouts3 = (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Change Workout
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTypeChart3('bench')}>Bench</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart3('squat')}>Squat</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart3('deadlift')}>Deadlift</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart3('shoulderpress')}>Shoulder Press</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart3('bicepcurl')}>Bicep Curl</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart3('triceppulldown')}>Tricep Pulldown</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeChart3('treadmill')}>Treadmill</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

        );
    }

    return (
        <Container className='pt-3'>
            <Button as={Link} to={`/`} variant="success">Back</Button>

            <Row className='py-3'>
                <Col>
                    <h3 className='text-center'>Your Workout Graphs</h3>
                </Col>
            </Row>

            <Row className='py-3'>
                <Col></Col>
                <Col>
                    {myChart1}
                </Col>
                <Col>
                    {myWorkouts}
                </Col>
            </Row>

            <Row className='py-3'>
                <Col></Col>
                <Col>
                    {myChart2}
                </Col>
                <Col>
                    {myWorkouts2}
                </Col>
            </Row>

            <Row className='py-3'>
                <Col></Col>
                <Col>
                    {myChart3}
                </Col>
                <Col>
                    {myWorkouts3}
                </Col>
            </Row>

        </Container>
    );
};

export default Dashboard;