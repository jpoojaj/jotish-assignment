import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import List from './pages/List';
import Details from './pages/Details';
import PhotoResult from './pages/PhotoResult';
import SalaryChart from './pages/SalaryChart';
import MapView from './pages/MapView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/photo" element={<PhotoResult />} />
        <Route path="/salary-chart" element={<SalaryChart />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;
