const express = require('express');
const tournamentRoutes = require("./src/routes/tournamentRoutes");
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const paymentRoutes = require("./src/routes/paymentRoutes");
const withdrawalRoutes = require("./src/routes/withdrawalRoutes");

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/api/tournaments', tournamentRoutes);

  app.get('/api/health', (req, res) => {
    const { getDatabaseMode } = require('./src/config/db');
    res.json({
      success: true,
      message: 'ProBattle API is running',
      databaseMode: getDatabaseMode()
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/withdrawals', withdrawalRoutes);
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