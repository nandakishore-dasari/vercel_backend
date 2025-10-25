// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const pollRoutes = require('./routes/pollRoutes');
const voteRoutes = require('./routes/voteRoutes');

const app = express();

// ---------- CORS Configuration ----------
const allowedOrigins = [process.env.CLIENT_URL]; // FRONTEND URL from env
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (Postman, mobile apps, server-to-server)
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) return callback(new Error('CORS not allowed'), false);
    return callback(null, true);
  },
  credentials: true // needed if you use cookies
}));

// ---------- Middleware ----------
app.use(express.json());

// ---------- Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/votes', voteRoutes);

// ---------- Root & Health Check ----------
app.get('/', (req, res) => res.send({ msg: 'Online Voting System API' }));
app.get('/healthz', (req, res) => res.status(200).json({ ok: true }));

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => {
    console.error('Mongo connection error', err.message);
  });
