import express = require('express');
import cors = require('cors');
import { countryMetadata } from './countryMetadata';
import { saveAddress, getAddresses, Address } from './db';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/metadata/countries', (req, res) => {
  res.json(Object.values(countryMetadata));
});

app.get('/metadata/countries/:code', (req, res) => {
  const meta = countryMetadata[req.params.code];
  if (!meta) return res.status(404).json({ error: 'Country not supported' });
  res.json(meta);
});

app.post('/addresses', (req, res) => {
  const { country, data } = req.body;
  if (!country || !data) return res.status(400).json({ error: 'Missing country or data' });
  saveAddress({ country, data });
  res.json({ success: true });
});

app.get('/addresses', (req, res) => {
  res.json(getAddresses());
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});