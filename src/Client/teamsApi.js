const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001; // This API will run on port 3001

app.use(bodyParser.json());

// Mock database for drivers and cars
let drivers = [];
let cars = [];

// GET: Retrieve all drivers
app.get('/driver', (req, res) => {
  res.status(200).json({ code: 200, result: drivers });
});

// POST: Add a new driver
app.post('/driver', (req, res) => {
  const { number, name, shortName, skill } = req.body;
  drivers.push({ number, name, shortName, skill });
  res.status(201).json({ code: 201, message: 'Driver added successfully!' });
});

// GET: Retrieve all cars
app.get('/car', (req, res) => {
  res.status(200).json({ code: 200, result: cars });
});

// POST: Add a new car
app.post('/car', (req, res) => {
  const { id, driverNumber, suitability, reliability } = req.body;
  cars.push({ id, driverNumber, suitability, reliability });
  res.status(201).json({ code: 201, message: 'Car added successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Teams API running at http://localhost:${PORT}`);
});
