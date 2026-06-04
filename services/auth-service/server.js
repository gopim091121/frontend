const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'userapp',
  password: process.env.DB_PASSWORD || 'userapp_password',
  database: process.env.DB_NAME || 'userapp',
  waitForConnections: true,
  connectionLimit: 10,
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', service: 'auth-service' });
  } catch (error) {
    res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [results] = await pool.query(
      'SELECT id, first_name, last_name, email, mobile FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: results[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
