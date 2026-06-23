const express = require('express');
const router = express.Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    // TODO: Validate input
    // TODO: Hash password with bcryptjs
    // TODO: Store user in PostgreSQL
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // TODO: Validate credentials
    // TODO: Generate JWT token
    res.json({ token: 'jwt-token-here' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
