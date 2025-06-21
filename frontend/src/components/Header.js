import React from 'react';

export default function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      backgroundColor: '#000',
      color: '#fff',
      zIndex: 1000,
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
    }}>
      {['apod', 'mars', 'neo','neo-chart', 'epic'].map(section => (
        <a
          key={section}
          href={`#${section}`}
          style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}
        >
          {section.toUpperCase()}
        </a>
      ))}
    </header>
  );
}
