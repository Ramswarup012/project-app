const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const authService = require('../services/authService');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const result = await authService.login(email, password);

    if (!result) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.json({
      success: true,
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name || !phone) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const result = await authService.signup({ email, password, name, phone });

    if (!result) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    return res.json({
      success: true,
      message: 'Account created successfully',
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token' });
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await authService.getCurrentUser(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;