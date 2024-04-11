require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const { queryDatabase, createPage } = require('./api');

module.exports = async (req, res) => {
  try {
    const response = await queryDatabase();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api', async (req, res) => {
  try {
    const response = await queryDatabase();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/createPage', async (req, res) => {
  try {
    const { category, content, title, created_at, modified_at } = req.body;
    const response = await createPage(category, content, title, created_at, modified_at);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});