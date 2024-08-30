const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js');
const path = require('path');
const app = express();

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
const apiKey = 'test_api_key'; // Replace with your actual API key

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

app.get('/test', (req, res) => {
    res.json(mockAPIResponse);
});

app.post('/api', async (req, res) => {
    const userInput = req.body.url;
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`;

    try {
        const apiResponse = await fetch(apiURL);
        if (!apiResponse.ok) {
            throw new Error('API response not OK');
        }
        const mcData = await apiResponse.json();
        res.status(200).send(mcData);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch data from MeaningCloud API.' });
    }
});

module.exports = app;
