// components/Loader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function Loader({ size = 50, color = "#36d7b7" }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px'
    }}>
      <ClipLoader size={size} color={color} />
    </div>
  );
}
