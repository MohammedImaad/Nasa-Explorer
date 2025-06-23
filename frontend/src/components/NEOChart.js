import React, { useEffect, useState } from 'react';
import { fetchNEO } from '../api/nasa';
import Loader from './Loader';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function NEOChart() {
  const [date, setDate] = useState('2023-06-01');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNEO = async () => {
      try {
        setLoading(true);
        const neoData = await fetchNEO(date);
        const flat = Object.values(neoData).flat();
        const chartData = flat.map(obj => ({
          name: obj.name,
          diameter: parseFloat(obj.estimated_diameter.meters.estimated_diameter_max),
          distance: parseFloat(obj.close_approach_data[0].miss_distance.kilometers),
          velocity: parseFloat(obj.close_approach_data[0].relative_velocity.kilometers_per_hour)
        }));
        setData(chartData);
        setError(chartData.length === 0 ? 'No data for chart' : '');
      } catch {
        setError('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };
    loadNEO();
  }, [date]);

  return (
    <section id="neo-chart" style={{ padding: '2rem', backgroundColor: '#fefefe' }}>
      <h2 style={{ textAlign: 'center' }}>📊 Asteroid Size vs Distance</h2>
      <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#555' }}>
        Asteroid size vs. distance — for when you want to stress-scroll through space math.
      </p>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().split('T')[0]}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="left" label={{ value: 'Diameter (m)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Distance (km)', angle: -90, position: 'insideRight' }} />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="diameter" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="distance" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
