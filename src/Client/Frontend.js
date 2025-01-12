const path = require('path'); // Import path to manage file paths
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3003; // Frontend runs on port 3003

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the location of your EJS templates
app.set('views', path.join(__dirname)); // Points to 'src/Client'
app.set('view engine', 'ejs'); // Use EJS as templating engine

// Home Page - Display all drivers, cars, and races
app.get('/', async (req, res) => {
  try {
    const driversResponse = await axios.get('http://localhost:3001/driver');
    const carsResponse = await axios.get('http://localhost:3001/car');
    const racesResponse = await axios.get('http://localhost:3002/race');

    res.render('Index', {
      drivers: driversResponse.data.result,
      cars: carsResponse.data.result,
      races: racesResponse.data.result,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.render('Index', { drivers: [], cars: [], races: [] });
  }
});

// POST: Add a new driver
app.post('/add-driver', async (req, res) => {
  const { number, name, shortName, raceSkill, streetSkill } = req.body;
  try {
    await axios.post('http://localhost:3001/driver', {
      number,
      name,
      shortName,
      skill: { race: parseInt(raceSkill), street: parseInt(streetSkill) },
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error adding driver:', error.message);
    res.redirect('/');
  }
});

// POST: Add a new car
app.post('/add-car', async (req, res) => {
  const { id, driverNumber, raceSuitability, streetSuitability, reliability } = req.body;
  try {
    await axios.post('http://localhost:3001/car', {
      id,
      driverNumber,
      suitability: { race: parseInt(raceSuitability), street: parseInt(streetSuitability) },
      reliability: parseInt(reliability),
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error adding car:', error.message);
    res.redirect('/');
  }
});

// POST: Add a new race
app.post('/add-race', async (req, res) => {
  const { raceId, trackId, entrants } = req.body;
  try {
    await axios.post('http://localhost:3002/race', {
      id: parseInt(raceId),
      trackId: parseInt(trackId),
      entrants: entrants.split(',').map(Number), // Convert entrants to an array of numbers
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error adding race:', error.message);
    res.redirect('/');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});
