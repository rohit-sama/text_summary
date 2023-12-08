const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const axios = require('axios');
const ApiData = require('./models/ApiData');

const app = express();

// MIDDLEWARE
app.use(bodyParser.json());  // Parse JSON from the request body
app.use(cors({
    credentials: true,
    origin: 'https://text-summary-alpha.vercel.app' // Update this to the actual frontend URL
  }));
  

//CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
    
    app.get('/test', (req, res) => {
      res.json('test ok');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); // Connect to the MongoDB cluster


  app.post('/summarize-text/v2', async (req, res) => {
    const {
      text
    } = req.body;
    console.log(text);
  
    const options = {
      method: 'POST',
      url: 'https://api.cohere.ai/v1/summarize',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.COHERE_API_KEY}` // Replace with your actual API key from environment variables
      },
      data: {
        length:  'medium',
        format:  'paragraph',
        extractiveness:  'low',
        temperature: 0.3,
        text: text || ''
      }
    };
    
    try {
      const response = await axios(options);
      const apiData = new ApiData({
        text: text,
        response: response.data
      });
      await apiData.save();
       // Set CORS headers for the response
    res.setHeader('Access-Control-Allow-Origin', 'https://text-summary-alpha.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      res.json(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  });

  app.get('/api-data', async (req, res) => {
    try {
      const allData = await ApiData.find({}); // Fetch all documents from the collection
       // Set CORS headers for the response
    res.setHeader('Access-Control-Allow-Origin', 'https://text-summary-alpha.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      res.json(allData); // Send all data as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data from the database.' });
    }
  });

  app.delete('/clear-history', async (req, res) => {
    try {
      // Remove all documents from the ApiData collection
      await ApiData.deleteMany({});

       // Set CORS headers for the response
    res.setHeader('Access-Control-Allow-Origin', 'https://text-summary-alpha.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      res.status(200).json({ message: 'History data cleared successfully' });
    } catch (error) {
      console.error('Error clearing history:', error);
      res.status(500).json({ error: 'An error occurred while clearing history data' });
    }
  });

  app.listen(4002, () => {
    console.log('Server running on port 4002');
  });