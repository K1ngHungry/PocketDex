const express = require("express");
const router = express.Router();
const { getSelectCards } = require('../data/cards');

router.get('/', async (req, res) => {
  try {
    const filters = {
      set_id: req.query.set_id,
      type: req.query.type,
      stage: req.query.stage,
      rarity: req.query.rarity,
      search: req.query.search,
      sortby: req.query.sortby
    };
    const cards = await getSelectCards(filters);
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});


module.exports = router;