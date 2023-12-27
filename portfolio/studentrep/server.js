// server.js

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'student_report',
});

// Get all student reports
app.get('/api/students', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new student report
app.post('/api/students', async (req, res) => {
  const { name, subject, score } = req.body;

  if (!name || !subject || !score) {
    return res.status(400).json({ error: 'Name, subject, and score are required.' });
  }

  try {
    await db.query('INSERT INTO students (name, subject, score) VALUES (?, ?, ?)', [name, subject, score]);
    res.json({ message: 'Student report added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
