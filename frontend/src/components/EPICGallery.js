import React, { useEffect, useState } from 'react';
import { fetchEPIC } from '../api/nasa';
import Loader from './Loader';

function buildImageUrl(imageName, date) {
  const [year, month, day] = date.split('-');
  return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${imageName}.png`;
}

export default function EPICGallery() {
  const [date, setDate] = useState('2023-06-01');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEPIC = async () => {
      try {
        setLoading(true);
        const data = await fetchEPIC(date);
        setImages(data);
        setError(data.length === 0 ? 'No EPIC images found for this date' : '');
      } catch {
        setError('Failed to load EPIC images');
      } finally {
        setLoading(false);
      }
    };
    loadEPIC();
  }, [date]);

  return (
    <section id="epic" style={{ padding: '2rem', background: '#f0f8ff' }}>
      <h2 style={{ textAlign: 'center' }}>🌍 EPIC Earth Images</h2>
      <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#555' }}>
        Earth caught by space paparazzi — candid shots taken from a million miles away.
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {images.map(img => (
            <img
              key={img.identifier}
              src={buildImageUrl(img.image, img.date.split(' ')[0])}
              alt={img.caption}
              style={{ width: '100%', borderRadius: 8 }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
