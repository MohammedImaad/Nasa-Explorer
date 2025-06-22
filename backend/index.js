// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getAPOD, getMarsPhotos, getNEO, getEPIC } = require('./nasa');
console.log('NASA API KEY:', process.env.NASA_API_KEY);


const app = express();
app.use(cors());

app.get('/apod', async (req, res) => {
  try {
    const data = await getAPOD();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
});

app.get('/mars-photos', async (req, res) => {
  const { rover = 'curiosity', date = '2020-07-01' } = req.query;
  try {
    const data = await getMarsPhotos(rover, date);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Mars photos' });
  }
});

app.get('/neo', async (req, res) => {
  const { start_date, end_date } = req.query;
  if (!start_date) return res.status(400).json({ error: 'start_date is required' });

  try {
    const data = await getNEO(start_date, end_date);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});

app.get('/epic', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'date is required' });

  try {
    const data = await getEPIC(date);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch EPIC images' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running`));
