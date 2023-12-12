const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
  res.send("Sweet Home!");
});

app.get('/data', async (req, res) =>{
  try {
    const imageUrl = 'https://i.ibb.co/b6prY8f/Rectangle-2-4.png';
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(response.data, 'binary'));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, ()=> {
  console.log(`http://localhost:${port}/`);
});