const express = require("express");
const router = express.Router();
const { getSelectCards, getCardsByIds } = require('../data/cards');

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

router.post('/batch', async(req, res) => {
  const card_ids = req.body.cards; // [{set_id: "A1", set_number: 2}, ...]
  if (!Array.isArray(card_ids)) {
    return res.status(400).json({ error: "Expected 'cards' to be an array" });
  }
  try {
    const cards = await getCardsByIds(card_ids);
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cards by ID list" });
  }
});

module.exports = router;