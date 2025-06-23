// components/MarsPhotos.js
import React, { useEffect, useState } from 'react';
import { fetchMarsPhotos } from '../api/nasa';
import Loader from './Loader';

export default function MarsPhotos() {
  const [rover, setRover] = useState('curiosity');
  const [date, setDate] = useState('2020-07-01');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getPhotos = async () => {
    try {
      setLoading(true);
      const data = await fetchMarsPhotos(rover, date);
      setPhotos(data);
      setError(data.length === 0 ? 'No photos found for this date' : '');
    } catch {
      setError('Failed to load Mars photos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhotos();
  }, [rover, date]);

  return (
    <section style={{ padding: '2rem', background: '#f7f7f7' }} id="mars">
      <h2 style={{ textAlign: 'center' }}>📸 Mars Rover Photo Gallery</h2>
      <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#555' }}>
        Mars sent us selfies. We’re here admire them like proud space parents.
      </p>


      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <select value={rover} onChange={e => setRover(e.target.value)}>
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
        </select>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {photos.map(photo => (
            <img
              key={photo.id}
              src={photo.img_src}
              alt={`Mars rover ${rover}`}
              style={{ width: '100%', borderRadius: 8 }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
