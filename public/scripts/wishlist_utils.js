async function loadWishlist() {
  try {
    const res = await fetch('http://localhost:3000/wishlist', {
      credentials: 'include'
    });
    const data = await res.json();
    return new Set(
      data.wishlist.map(card => `${card.set_id}-${card.set_number}`)
    );
  } catch (err) {
    console.error("Failed to load wishlist:", err);
    return new Set();
  }
}

async function addToWishlist(card) {
  const set_id = card.set_id;
  const set_number = card.set_number;
  console.log("Sending to backend:", { set_id, set_number });
  try {
    const res = await fetch('http://localhost:3000/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ set_id, set_number })
    });
    const data = await res.json();
    console.log("Added1 to wishlist:", data);
  } catch (err) {
    console.error("Error adding to wishlist:", err.message);
  }
}

async function removeFromWishlist(card) {
  const set_id = card.set_id;
  const set_number = card.set_number;
  try {
    const res = await fetch('http://localhost:3000/wishlist', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ set_id, set_number })
    });
    const data = await res.json();
    console.log("Removed from wishlist:", data);
  } catch (err) {
    console.error("Error removing from wishlist:", err.message);
  }
}