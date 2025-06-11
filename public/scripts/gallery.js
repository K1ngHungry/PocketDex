let container = document.getElementById('card-container');
const searchEl = document.getElementById('search');
const setEl = document.getElementById('filter-set');
const typeEl = document.getElementById('filter-type');
const stageEl = document.getElementById('filter-stage');
const rarityEl = document.getElementById('filter-rarity');
const sortByEl = document.getElementById('sort-by');
const resetBtn = document.getElementById('reset-button');
const homeBtn = document.getElementById('home-btn');
const galleryBtn = document.getElementById('gallery-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
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

let allSets = [];
let allCards = [];

function cmpSetNumber(c1, c2) {
  if (c1.setcode < c2.setcode) return -1;
  if (c1.setcode > c2.setcode) return 1;
  return Number(c1.number) - Number(c2.number);
}

function cmpName (c1, c2) {
  return c1.name.localeCompare(c2.name);
}

function cmpType(c1,c2) {
  const t1 = (c1.type || c1.category);
  const t2 = (c2.type || c2.category);
  if (t1 != t2) {
    return typeDict[t1] - typeDict[t2];
  }
  return cmpSetNumber(c1,c2);
}

function cmpRarityA(c1,c2) {
  let r1;
  c1.rarity != null ? r1 = c1.rarity : r1 = "";
  let r2;
  c2.rarity != null ? r2 = c2.rarity : r2 = "";
  if (r1 != r2) {
    return rarityDict[r1] - rarityDict[r2];
  }
  return cmpSetNumber(c1,c2);
}

function cmpRarityB(c1,c2) {
  let r1;
  c1.rarity != null ? r1 = c1.rarity : r1 = "";
  let r2;
  c2.rarity != null ? r2 = c2.rarity : r2 = "";
  if (r1 != r2) {
    return rarityDict[r2] - rarityDict[r1];
  }
  return cmpSetNumber(c1,c2);
}

function createInfo(card) {
  const div = document.createElement("div");
  div.innerHTML = `
      <h3>${card.name}</h3>
      <p><strong>HP:</strong> ${card.hp}</p>
      <p><strong>Type:</strong> ${card.type}</p>
      <p><strong>Stage:</strong> ${card.stage}</p>
      <p><strong>Rarity:</strong> ${card.rarity}</p>
      <p><strong>Attack:</strong> ${card.attacks}</p>
    `;
  return div;
}
function updateWishlist(cardId, button) {
  if (wishlist.has(cardId)) {
    removeFromWishlist(cardId);
    wishlist.delete(cardId);
    button.classList.remove("in-wishlist");
    button.classList.add("notin-wishlist");
  } 
  else {
    addToWishlist(cardId);
    wishlist.add(cardId);
    button.classList.remove("notin-wishlist");
    button.classList.add("in-wishlist");
  }
}

function renderCards() {
  const textFilter = searchEl.value.toLowerCase();
  const setFilter = setEl.value;
  const typeFilter = typeEl.value;
  const stageFilter = stageEl.value;
  const rarityFilter = rarityEl.value;
  const sortBy = sortByEl.value;

  const filtered = allCards
    .filter(card => card.name.toLowerCase().includes(textFilter))
    .filter(card => setFilter === "" || card.setcode === setFilter)
    .filter(card => typeFilter === "" || card.type === typeFilter)
    .filter(card => stageFilter === "" || card.stage === stageFilter)
    .filter(card => rarityFilter === "" || card.rarity === rarityFilter);
  
  let sorted = filtered
  switch(sortBy) {
    case "set-number":
      sorted = filtered.sort(cmpSetNumber);
      break;
    case "name":
      sorted = filtered.sort(cmpName);
      break;
    case "type":
      sorted = filtered.sort(cmpType);
      break;
    case "rarity-ascending":
      sorted = filtered.sort(cmpRarityA);
      break;
    case "rarity-descending":
      sorted = filtered.sort(cmpRarityB);
      break;
  }

  container.innerHTML = '';
  for (const card of sorted) {
    const div = createCardElem(card);
    const button = createWishlistBtn(card);

    if (wishlist.has(`${card.setcode}-${card.number}`)) {
      button.classList.remove("notin-wishlist");
      button.classList.add("in-wishlist");
    }
    div.appendChild(button);
    container.appendChild(div);
  }
}

fetch('../data/sets.json')
  .then(response => response.json())
  .then(data => allSets = data)
  .catch(err => {
    container.innerHTML = '<p>Error loading sets.json. Make sure it exists and is in the same folder.</p>';
    console.error(err);
  });

fetch('../data/cards.json')
  .then(response => response.json())
  .then(data => {
    allCards = data;
    return loadWishlist();
  })
  .then(() => {renderCards();})
  .catch(err => {
    container.innerHTML = '<p>Error loading cards.json. Make sure it exists and is in the same folder.</p>';
    console.error(err);
  });

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