import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { emp } = location.state || {};
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCapture = async () => {
    setCapturing(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imgData = canvas.toDataURL('image/png');
    video.srcObject.getTracks().forEach(track => track.stop());
    setCapturing(false);
    navigate('/photo', { state: { imgData, emp } });
  };

  if (!emp) return <div className="details-error">No employee data found.</div>;

  return (
    <div className="details-container">
      <h2>Employee Details</h2>
      <div className="details-info">
        {Object.entries(emp).map(([key, value]) => (
          <div key={key}><b>{key}:</b> {value}</div>
        ))}
      </div>
      <button onClick={startCapture}>Capture Photo</button>
      {capturing && (
        <div className="capture-area">
          <video ref={videoRef} width="320" height="240" />
          <button onClick={capturePhoto}>Take Photo</button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      )}
    </div>
  );
};

export default Details;
