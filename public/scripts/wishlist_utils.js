async function loadWishlist(user_id) {
  try {
    const res = await fetch(`http://localhost:3000/wishlist/${user_id}`);
    const data = await res.json();
    return new Set(
      data.wishlist.map(card => `${card.set_id}-${card.set_number}`)
    );
  } catch (err) {
    console.error("Failed to load wishlist:", err);
    return new Set();
  }
}

async function addToWishlist(user_id, card) {
  const set_id = card.set_id;
  const set_number = card.set_number;
  try {
    const res = await fetch('http://localhost:3000/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, set_id, set_number })
    });
    const data = await res.json();
    console.log("Added to wishlist:", data);
  } catch (err) {
    console.error("Error adding to wishlist:", err.message);
  }
}

async function removeFromWishlist(user_id, card) {
  const set_id = card.set_id;
  const set_number = card.set_number;
  try {
    const res = await fetch('http://localhost:3000/wishlist', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, set_id, set_number })
    });
    const data = await res.json();
    console.log("Removed from wishlist:", data);
  } catch (err) {
    console.error("Error removing from wishlist:", err.message);
  }
}