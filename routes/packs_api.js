const express = require('express');
const router  = express.Router();
const db      = require('../data/db');   // your mysql2 promise‐pool

// GET /packs — return an array of all pack names
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT DISTINCT pack
       FROM cards
       WHERE pack IS NOT NULL
       ORDER BY pack;`
    );
    // rows is like [ { pack: 'Mythical Island' }, … ]
    res.json(rows.map(r => r.pack));
  } 
  catch (err) {
    console.error('Failed to load packs:', err);
    res.status(500).json({ error: 'Internal error' });
  }
});

router.get('/:set_id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT DISTINCT pack
       FROM cards
       WHERE pack IS NOT NULL AND set_id = ?
       ORDER BY pack;`, [req.params.set_id]
    );
    // rows is like [ { pack: 'Mythical Island' }, … ]
    res.json(rows.map(r => r.pack));
  } 
  catch (err) {
    console.error('Failed to load packs:', err);
    res.status(500).json({ error: 'Internal error' });
  }
});

module.exports = router;