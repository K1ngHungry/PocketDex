const express = require("express");
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "wishlist.json");
const router = express.Router();

// Load wishlist from file
function loadWishlist() {
  try {
    const data = fs.readFileSync(FILE, "utf8");
    return JSON.parse(data).wishlist || [];
  } 
  catch (err) {
    return [];
  }
}

// Save wishlist to file
function saveWishlist(wishlist) {
  fs.writeFileSync(FILE, JSON.stringify({ wishlist }, null, 2));
}


// GET /wishlist - Get all items
router.get("/", (req, res) => {
  const wishlist = loadWishlist();
  res.json({ wishlist });
});

// POST /wishlist/add - Add item
router.post("/add", (req, res) => {
  const { card_id } = req.body;
  if (!card_id) return res.status(400).json({ error: "card_id is required" });

  const wishlist = loadWishlist();
  if (!wishlist.includes(card_id)) {
    wishlist.push(card_id);
    saveWishlist(wishlist);
  }
  res.json({ wishlist });
});

// POST /wishlist/remove - Remove item
router.delete("/remove", (req, res) => {
  const { card_id } = req.body;
  if (!card_id) return res.status(400).json({ error: "card_id is required" });

  let wishlist = loadWishlist();
  wishlist = wishlist.filter(id => id != card_id);
  saveWishlist(wishlist);

  res.json({ wishlist });
});

module.exports = router;