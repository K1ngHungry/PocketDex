const container = document.getElementById('card-container');
const homeBtn = document.getElementById('home-btn');
const galleryBtn = document.getElementById('gallery-btn');
const wishlistBtn = document.getElementById('wishlist-btn');

const user_id = 1;
let wishlist = new Set();

async function renderWishlist(wishlist) {
  container.innerHTML = '';
  const card_ids = Array.from(wishlist).map(card_id => {
    const [set_id, set_number] = card_id.split('-');
    return { set_id, set_number: parseInt(set_number) };
  });
  const response = await fetch('http://localhost:3000/cards/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cards: card_ids })
  });
  const cards = await response.json();
  
  for (const card of cards) {
    const div = createCardElem(card);
    const button = createRemoveBtn(user_id, card);
    div.appendChild(button);
    container.appendChild(div);
  }
}

//Load wishlist
document.addEventListener("DOMContentLoaded", async () => {
  wishlist = await loadWishlist(user_id);  // wait for it and assign result
  console.log(wishlist);
  renderWishlist(wishlist);                           // now uses actual Set, not a Promise
});

homeBtn.addEventListener('click', () => {
  window.location.href = "index.html";
});
galleryBtn.addEventListener('click', () => {
  window.location.href = "gallery.html";
});
wishlistBtn.addEventListener('click', () => {
  window.location.href = "wishlist.html";
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    loadWishlist().then(() => renderCards());
  }
});