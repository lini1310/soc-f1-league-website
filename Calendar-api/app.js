const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.json());
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: "",
  database: DB_NAME,
});
app.post('/events', async (req, res) => {
    try {
      const { title, event_date } = req.body;
  
      if (!title || !event_date) {
        return res.status(400).json({ error: 'Title and event_date are required.' });
      }
  
      const [result] = await db.query('INSERT INTO events (title, event_date) VALUES (?, ?)', [title, event_date]);
      res.status(201).json({ id: result.insertId, title, event_date });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while inserting the event.' });
    }
  });
  
  app.get('/events', async (req, res) => {
    try {
      const [events] = await db.query('SELECT * FROM events ORDER BY event_date');
      res.status(200).json(events);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the events.' });
    }
  });
  
  app.delete('/events/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ error: 'Event id is required.' });
      }
  
      const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found.' });
      }
  
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the event.' });
    }
  });
  
  
  const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  