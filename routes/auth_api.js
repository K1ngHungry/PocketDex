const express = require('express');
const router = express.Router();
const { getUserById, getUserByName, addUser, authUser } = require('../data/users');


router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  const existing = await getUserByName(username);
  if (existing) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  try {
    await addUser(username, password);  // plain-text password
    res.status(201).json({ success: true, message: 'User signuped successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to signup user' });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    const result = await authUser(username, password);
    if (result.success) {
      req.session.user_id = result.user_id;
      res.json(result);
    } else {
      res.status(401).json({ error: result.message });
    }
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/signout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Signout error:', err);
      return res.status(500).json({ error: 'Failed to sign out' });
    }

    res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
    res.json({ message: 'Logged out' });
  });
});

router.get('/user', async (req, res) => {
  if (!req.session.user_id) {
    return res.json({ signedIn: false });
  }

  try {
    const user = await getUserById(req.session.user_id);
    res.json({
      signedIn: true,
      user_id: user.user_id,
      username: user.username
    });
  } catch (err) {
    console.error('Auth check error:', err);
    res.status(500).json({ signedIn: false, error: 'Internal error' });
  }
});

module.exports = router;
