import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PhotoResult.css';

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imgData, emp } = location.state || {};

  if (!imgData) return <div className="photo-error">No photo captured.</div>;

  return (
    <div className="photo-result-container">
      <h2>Captured Photo</h2>
      <img src={imgData} alt="Captured" className="captured-img" />
      <button onClick={() => navigate('/list')}>Back to List</button>
    </div>
  );
};

export default PhotoResult;
