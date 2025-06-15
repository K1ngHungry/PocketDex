const express = require("express");
const router = express.Router();
const { getUserWlist, addToWlist, removeFromWlist } = require('../data/wishlist');

router.get("/:user_id", async (req, res) => {
  const wishlist = await getUserWlist(req.params.user_id);
  res.json({ wishlist });
});

router.post("/", async (req, res) => {
  const { user_id, set_id, set_number } = req.body;
  try {
    await addToWlist(user_id, set_id, set_number);
    res.status(201).json({ message: "Card added to wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add card to wishlist" });
  }
});

router.delete("/", async (req, res) => {
  const { user_id, set_id, set_number } = req.body;
  try {
    await removeFromWlist(user_id, set_id, set_number);
    res.status(200).json({ message: "Card removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove card from wishlist" });
  }
});

module.exports = router;