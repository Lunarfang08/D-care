const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3002; // This API will run on port 3002

app.use(bodyParser.json());

// Mock database for tracks and races
let tracks = [];
let races = [];

// GET: Retrieve all tracks
app.get('/track', (req, res) => {
  res.status(200).json({ code: 200, result: tracks });
});

// POST: Add a new track
app.post('/track', (req, res) => {
  const { id, name, type, laps, baseLapTime } = req.body;
  tracks.push({ id, name, type, laps, baseLapTime });
  res.status(201).json({ code: 201, message: 'Track added successfully!' });
});

// GET: Retrieve all races
app.get('/race', (req, res) => {
  res.status(200).json({ code: 200, result: races });
});

// POST: Add a new race
app.post('/race', (req, res) => {
  const { id, trackId, entrants } = req.body;
  races.push({ id, trackId, entrants });
  res.status(201).json({ code: 201, message: 'Race created successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Timing API running at http://localhost:${PORT}`);
});


// // Import the necessary modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');

// // Create the Express app
// const app = express();
// const PORT = 3002; // This API will run on port 3002

// // Use body-parser to parse incoming JSON requests
// app.use(bodyParser.json());

// // GET: Retrieve all cars from the Teams API
// app.get('/cars-from-teams', async (req, res) => {
//   try {
//     const response = await axios.get('http://localhost:3001/car');
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ code: 500, message: 'Error fetching cars' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Timing API running at http://localhost:${PORT}`);
// });
