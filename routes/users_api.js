const express = require("express");
const router = express.Router();
const { getUsers, getUser } = require('../data/users');

router.get('/', async (req, res) => {
    try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


router.get('/:user_id', async (req, res) => {
  try {
    const user = await getUser(req.params.user_id);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch set' });
  }
});

module.exports = router;