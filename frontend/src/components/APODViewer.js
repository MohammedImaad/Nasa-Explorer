// components/APODViewer.js
import React, { useEffect, useState } from 'react';
import { fetchAPOD } from '../api/nasa';
import Loader from './Loader';

export default function APODViewer() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAPOD()
      .then(setData)
      .catch(() => setError('Failed to load APOD'));
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <Loader />;

  const isImage = data.media_type === 'image';

  return (
    <section id="apod"
      style={{
        height: '90vh',
        position: 'relative',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
    >
      {isImage ? (
        <img
          src={data.url}
          alt={data.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0
          }}
        />
      ) : (
        <iframe
          src={data.url}
          title={data.title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            opacity: 0.6,
          }}
        />
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{data.title}</h1>
        <p style={{ maxWidth: 800, margin: '0 auto', fontSize: '1.1rem' }}>
          {data.explanation.slice(0, 300)}...
        </p>
      </div>
    </section>
  );
}
