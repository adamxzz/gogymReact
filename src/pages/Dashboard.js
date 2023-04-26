import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
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
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const Dashboard = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    let location = useLocation();
    // const [chartData, setChartData] = useState({});
    const [labels, setLabels] = useState([]);
    const [weights, setWeights] = useState({});
    const [type, setType] = useState('bench');

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: type,
          },
        },
      };

    useEffect(() => {
        axios
            .get(`http://localhost/api/workouts/chart/${type}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                // setChartData(response.data);
                setLabels(response.data.labels);
                setWeights(response.data.weights);
                setType(response.data.type);

            })
            .catch(function (error) {
                console.log(error);
            });
    }, [type]);

    let myChart = (
        <h3>No chart data</h3>
    );

    if(labels.length > 0){
        myChart = (
            <Line
                options={options}
                datasetIdKey='id'
                data={{
                labels: labels,
                datasets: [
                    {
                        ...weights,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ]
            }}/>
        ); 
    }

    return (
        <Container className='pt-3'>
            <Row className='py-3'>
                <Col>
                    <h3 className='text-center'>Dashboard</h3>
                </Col>
            </Row>

            
            <Row className='py-3'>
                <Col>
                {myChart}  
                </Col>
            </Row>

            <Row className="justify-content-md-center py-3">
                <Col className="pull-right">
                    <Button variant="success">
                        <Link className='linkb' to="/CreateWorkout">
                            Create a Workout
                        </Link>
                    </Button>
                </Col>
                <Col>
                    <Button variant="success">
                        <Link className='linkb' to="/CreateHabit">
                            Create a Habit
                        </Link>
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center py-3">
                <Col>
                    <Button variant="success">
                        <Link className='linkb' to="/ViewWorkout">
                            View a Workout
                        </Link>
                    </Button>
                </Col>
                <Col>
                    <Button variant="success">
                        <Link className='linkb' to="/ViewHabit">
                            View a Habit
                        </Link>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;