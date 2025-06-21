// backend/nasa.js
const axios = require('axios');
const NASA_API_KEY = process.env.NASA_API_KEY;

// 1. Astronomy Picture of the Day
async function getAPOD() {
  const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
  return res.data;
}

// 2. Mars Rover Photos
async function getMarsPhotos(rover, date) {
  const res = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${NASA_API_KEY}`);
  return res.data.photos;
}

// 3. Near Earth Object Feed
async function getNEO(startDate, endDate) {
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate || startDate}&api_key=${NASA_API_KEY}`;
  const res = await axios.get(url);
  return res.data.near_earth_objects;
}

// 4. EPIC Earth Images
async function getEPIC(date) {
  const res = await axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${NASA_API_KEY}`);
  return res.data;
}

module.exports = { getAPOD, getMarsPhotos, getNEO, getEPIC };
