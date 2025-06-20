let container = document.getElementById('card-container');
const searchEl = document.getElementById('search');
const setEl = document.getElementById('filter-set');
const typeEl = document.getElementById('filter-type');
const stageEl = document.getElementById('filter-stage');
const rarityEl = document.getElementById('filter-rarity');
const sortByEl = document.getElementById('sort-by');
const resetBtn = document.getElementById('reset-button');

const typeDict = {
  "Grass" : 0,
  "Fire" : 1,
  "Water" : 2,
  "Lightning" : 3,
  "Psychic" : 4,
  "Fighting" : 5,
  "Darkness" : 6,
  "Metal" : 7,
  "Dragon" : 8,
  "Colorless" : 9,
  "Item" : 10,
  "Supporter" : 11,
  "Tool" : 12
}

const rarityDict = {
  "\u25ca" : 0,
  "\u25ca\u25ca" : 1,
  "\u25ca\u25ca\u25ca" : 2,
  "\u25ca\u25ca\u25ca\u25ca" : 3,
  "\u2606" : 4,
  "\u2606\u2606" : 5,
  "\u2606\u2606\u2606" : 6,
  "Crown Rare" : 7,
  "" : 8
}

function updateWishlist(card, button) {
  const card_id = `${card.set_id}-${card.set_number}`;
  if (wishlist.has(card_id)) {
    removeFromWishlist(card);
    wishlist.delete(card_id);
    button.classList.remove("in-wishlist");
    button.classList.add("notin-wishlist");
  } 
  else {
    addToWishlist(card);
    wishlist.add(card_id);
    button.classList.remove("notin-wishlist");
    button.classList.add("in-wishlist");
  }
  console.log(wishlist);
}

async function renderCards() {
  const params = new URLSearchParams();
  if (searchEl.value) params.append("search", searchEl.value);
  if (setEl.value) params.append("set_id", setEl.value);
  if (typeEl.value) params.append("type", typeEl.value);
  if (stageEl.value) params.append("stage", stageEl.value);
  if (rarityEl.value) params.append("rarity", rarityEl.value);
  if (sortByEl.value) params.append("sortby", sortByEl.value);

  const response = await fetch(`http://localhost:3000/cards?${params.toString()}`);
  const cards = await response.json();

  container.innerHTML = '';
  for (const card of cards) {
    const div = createCardElem(card);
    const button = createWishlistBtn(card);

    if (wishlist.has(`${card.set_id}-${card.set_number}`)) {
      button.classList.remove("notin-wishlist");
      button.classList.add("in-wishlist");
    }
    div.appendChild(button);
    container.appendChild(div);
  }
}

searchEl.addEventListener('input',  renderCards);
setEl.addEventListener('change', renderCards);
typeEl.addEventListener('change', renderCards);
stageEl.addEventListener('change', renderCards);
rarityEl.addEventListener('change', renderCards);
sortByEl.addEventListener('change', renderCards);
resetBtn.addEventListener('click', () => {
  setEl.value = "";
  typeEl.value = "";
  stageEl.value = "";
  rarityEl.value = "";
  sortByEl.value = "set-number";
  renderCards();
});

let wishlist;
document.addEventListener("DOMContentLoaded", async () => {
  wishlist = await loadWishlist();
  renderCards();
});

window.addEventListener("pageshow", async (event) => {
  if (event.persisted) {
    wishlist = await loadWishlist();
    renderCards();
  }
});