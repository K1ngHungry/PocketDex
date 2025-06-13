const express = require("express");
const router = express.Router();
const { getSets, getSet } = require('../data/sets');

router.get('/', async (req, res) => {
    try {
    const sets = await getSets();
    res.json(sets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch sets' });
  }
});


router.get('/:set_id', async (req, res) => {
  try {
    const set = await getSet(req.params.set_id);
    if (set.length === 0) {
      return res.status(404).json({ error: 'Set not found' });
    }
    res.json(set[0]);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch set' });
  }
});

module.exports = router;