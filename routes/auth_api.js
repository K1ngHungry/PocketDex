const express = require('express');
const router = express.Router();
const { getUserByName, registerUser, loginUser } = require('../data/users');


router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  const existing = await getUserByName(username);
  if (existing) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  try {
    await registerUser(username, password);  // plain-text password
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    const result = await loginUser(username, password);
    if (result.success) {
      req.session.user_id = result.user_id;
      res.json(result);
    } else {
      res.status(401).json({ error: result.message });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Failed to log out' });
    }

    res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
