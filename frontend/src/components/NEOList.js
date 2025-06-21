import React, { useEffect, useState } from 'react';
import { fetchNEO } from '../api/nasa';
import Loader from './Loader';

export default function NEOList() {
  const [date, setDate] = useState('2023-06-01');
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchNEO(date);
        const flatList = Object.values(data).flat(); // combine all date keys
        setAsteroids(flatList);
        setError(flatList.length === 0 ? 'No NEOs for this date' : '');
      } catch (err) {
        setError('Failed to load asteroid data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [date]);

  return (
    <section style={{ padding: '2rem', backgroundColor: '#fff' }} id="neo">
      <h2 style={{ textAlign: 'center' }}>☄️ Near Earth Objects</h2>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <ul>
            {asteroids.map(asteroid => (
              <li key={asteroid.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <strong>{asteroid.name}</strong><br />
                Distance from Earth: {parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toFixed(0)} km<br />
                Diameter: {parseFloat(asteroid.estimated_diameter.meters.estimated_diameter_max).toFixed(1)} m<br />
                Velocity: {parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0)} km/h
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
