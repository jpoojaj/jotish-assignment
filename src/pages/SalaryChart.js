import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './SalaryChart.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = 'https://backend.jotish.in/backend_dev/gettabledata.php';

const SalaryChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.post(API_URL, { username: 'test', password: '123456' })
      .then(res => {
        const employees = res.data.data.slice(0, 10);
        setChartData({
          labels: employees.map(emp => emp.name),
          datasets: [
            {
              label: 'Salary',
              data: employees.map(emp => emp.salary),
              backgroundColor: 'rgba(75,192,192,0.6)',
            },
          ],
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="chart-loading">Loading...</div>;
  if (error) return <div className="chart-error">{error}</div>;

  return (
    <div className="chart-container">
      <h2>Salary Bar Graph (Top 10)</h2>
      <Bar data={chartData} options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Employee Salaries' },
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Salary' } },
          x: { title: { display: true, text: 'Employee Name' } },
        },
      }} />
    </div>
  );
};

export default SalaryChart;
