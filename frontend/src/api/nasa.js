const API_BASE = 'https://nasa-backend-waz8.onrender.com'; // Change to deployed URL later

export async function fetchAPOD() {
  const res = await fetch(`${API_BASE}/apod`);
  if (!res.ok) throw new Error('Failed to fetch APOD');
  return res.json();
}
export async function fetchMarsPhotos(rover, date) {
  const res = await fetch(`${API_BASE}/mars-photos?rover=${rover}&date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch Mars photos');
  return res.json();
}
export async function fetchNEO(startDate) {
  const res = await fetch(`${API_BASE}/neo?start_date=${startDate}`);
  if (!res.ok) throw new Error('Failed to fetch NEO data');
  return res.json();
}
export async function fetchEPIC(date) {
  const res = await fetch(`${API_BASE}/epic?date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch EPIC images');
  return res.json();
}

