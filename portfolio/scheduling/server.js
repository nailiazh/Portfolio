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
  database: 'scheduling_app',
});

// Get all schedules
app.get('/api/schedules', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM schedules');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new schedule
app.post('/api/schedules', async (req, res) => {
  const { title, description, start_time, end_time } = req.body;

  if (!title || !start_time || !end_time) {
    return res.status(400).json({ error: 'Title, start time, and end time are required.' });
  }

  try {
    await db.query('INSERT INTO schedules (title, description, start_time, end_time) VALUES (?, ?, ?, ?)', [title, description, start_time, end_time]);
    res.json({ message: 'Schedule added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a schedule
app.put('/api/schedules/:id', async (req, res) => {
  const { title, description, start_time, end_time } = req.body;
  const { id } = req.params;

  if (!title || !start_time || !end_time) {
    return res.status(400).json({ error: 'Title, start time, and end time are required.' });
  }

  try {
    await db.query('UPDATE schedules SET title=?, description=?, start_time=?, end_time=? WHERE id=?', [title, description, start_time, end_time, id]);
    res.json({ message: 'Schedule updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a schedule
app.delete('/api/schedules/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM schedules WHERE id=?', [id]);
    res.json({ message: 'Schedule deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
