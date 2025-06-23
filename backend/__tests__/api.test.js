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
});
