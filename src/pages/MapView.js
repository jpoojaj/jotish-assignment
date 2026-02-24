import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapView.css';

// Fix default icon issue
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const API_URL = 'https://backend.jotish.in/backend_dev/gettabledata.php';

const MapView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cityCoords, setCityCoords] = useState({});

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

  useEffect(() => {
    const fetchCoords = async () => {
      const coords = {};
      for (const emp of data) {
        if (!coords[emp.city]) {
          try {
            const resp = await axios.get(`https://nominatim.openstreetmap.org/search`, {
              params: { q: emp.city, format: 'json', limit: 1 },
            });
            if (resp.data[0]) {
              coords[emp.city] = {
                lat: parseFloat(resp.data[0].lat),
                lon: parseFloat(resp.data[0].lon),
              };
            }
          } catch {}
        }
      }
      setCityCoords(coords);
    };
    if (data.length) fetchCoords();
  }, [data]);

  if (loading) return <div className="map-loading">Loading...</div>;
  if (error) return <div className="map-error">{error}</div>;

  return (
    <div className="map-container">
      <h2>Employee Cities Map</h2>
      <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {data.map(emp => {
          const coords = cityCoords[emp.city];
          if (!coords) return null;
          return (
            <Marker key={emp.id} position={[coords.lat, coords.lon]}>
              <Popup>
                <b>{emp.name}</b><br />
                {emp.city}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
