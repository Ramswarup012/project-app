const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (req, res) => {
    const { getDatabaseMode } = require('./config/db');
    res.json({
      success: true,
      message: 'ProBattle API is running',
      databaseMode: getDatabaseMode()
    });
  });

  app.use('/api/auth', authRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  app.use((error, req, res, next) => {
    console.error('Unhandled API error:', error);
    res.status(500).json({ error: 'Server error' });
  });

  return app;
}

module.exports = { createApp };