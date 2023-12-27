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
  database: 'expenses_tracker',
});

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM expenses');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new expense
app.post('/api/expenses', async (req, res) => {
  const { description, amount, date } = req.body;

  if (!description || !amount || !date) {
    return res.status(400).json({ error: 'Description, amount, and date are required.' });
  }

  try {
    await db.query('INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)', [description, amount, date]);
    res.json({ message: 'Expense added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an expense
app.put('/api/expenses/:id', async (req, res) => {
  const { description, amount, date } = req.body;
  const { id } = req.params;

  if (!description || !amount || !date) {
    return res.status(400).json({ error: 'Description, amount, and date are required.' });
  }

  try {
    await db.query('UPDATE expenses SET description=?, amount=?, date=? WHERE id=?', [description, amount, date, id]);
    res.json({ message: 'Expense updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an expense
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM expenses WHERE id=?', [id]);
    res.json({ message: 'Expense deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
