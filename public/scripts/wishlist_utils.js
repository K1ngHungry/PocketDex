let wishlist = new Set();

function loadWishlist() {
  return fetch('http://localhost:3000/api/wishlist')
    .then(res => res.json())
    .then(data => {
      wishlist = new Set(data.wishlist);
    });
}

function addToWishlist(cardId) {
  fetch('http://localhost:3000/api/wishlist/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "card_id" : cardId })
  })
    //.then(res => res.json())
    .then(res => {return res.json();})
    .then(data => {
        console.log("Added:", data);
    })
    .catch(err => {
        console.error("Error:", err.message);
  });
}

function removeFromWishlist(cardId) {
  fetch(`http://localhost:3000/api/wishlist/remove`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ card_id: cardId })
  })
    .then(res => {return res.json();})
    .then(data => {
      console.log("Removed:", data);
    })
    .catch(err => {
        console.error("Error:", err.message);
    });
}