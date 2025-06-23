const request = require('supertest');
const express = require('express');
const app = require('../index'); // adjust if needed

describe('NASA API routes', () => {
  it('GET /apod should return APOD data', async () => {
    const res = await request(app).get('/apod');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
  });

  it('GET /neo without start_date should fail', async () => {
    const res = await request(app).get('/neo');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /mars-photos should return Curiosity photos on a known date', async () => {
    const res = await request(app).get('/mars-photos?rover=curiosity&date=2023-06-01');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /neo with valid start_date should return NEO data', async () => {
    const res = await request(app).get('/neo?start_date=2023-06-01');
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('object');
  });
  

});
