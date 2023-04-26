import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const WeightChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        const response = await fetch('/api/workout/weights'); // replace with actual API endpoint
        const weightData = await response.json();
        setChartData({
          labels: weightData.map((data) => data.date),
          datasets: [
            {
              label: 'Weight',
              data: weightData.map((data) => data.weight),
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeightData();
  }, []);

  return (
    <div>
        <h1>Chart</h1>
      <Line data={chartData} />
    </div>
  );
};

export default WeightChart;