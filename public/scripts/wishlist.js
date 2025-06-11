const container = document.getElementById('card-container');
const homeBtn = document.getElementById('home-btn');
const galleryBtn = document.getElementById('gallery-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
let allCards = [];

function renderWishlist() {
  const inlist = allCards.filter(card => wishlist.has(`${card.setcode}-${card.number}`));
  container.innerHTML = '';
  for (const card of inlist) {
    const div = createCardElem(card);
    const button = createRemoveBtn(card);
    div.appendChild(button);
    container.appendChild(div);
  }
}

fetch('../data/cards.json')
  .then(response => response.json())
  .then(data => {
    allCards = data;
    return loadWishlist();
  })
  .then(() => {renderWishlist();})
  .catch(err => {
    container.innerHTML = '<p>Error loading cards.json. Make sure it exists and is in the same folder.</p>';
    console.error(err);
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