const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

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

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      mobile VARCHAR(30) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', service: 'registration-service' });
  } catch (error) {
    res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  if (!firstName || !lastName || !email || !mobile || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await pool.query(
      'INSERT INTO users (first_name, last_name, email, mobile, password) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, mobile, password]
    );

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

ensureSchema()
  .then(() => {
    app.listen(port, () => {
      console.log(`Registration service running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize registration service schema');
    console.error(error);
    process.exit(1);
  });
