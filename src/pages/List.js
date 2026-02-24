import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './List.css';

const API_URL = 'https://backend.jotish.in/backend_dev/gettabledata.php';

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(API_URL, { username: 'test', password: '123456' })
      .then(res => {
        setData(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="list-loading">Loading...</div>;
  if (error) return <div className="list-error">{error}</div>;

  return (
    <div className="list-container">
      <h2>Employee List</h2>
      <button onClick={() => navigate('/salary-chart')}>View Salary Bar Graph</button>
      <button onClick={() => navigate('/map')}>View Map of Cities</button>
      <table className="list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.city}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => navigate(`/details/${emp.id}`, { state: { emp } })}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
