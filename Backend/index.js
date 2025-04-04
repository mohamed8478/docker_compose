const express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;





const client = new Client({
  host: 'db',  
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

client.connect();

app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT id, name FROM users');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


