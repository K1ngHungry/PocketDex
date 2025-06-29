const card_container = document.getElementById('card-container');
const set_table = document.getElementById('set-table');
const pack_table = document.getElementById('pack-table');
const backBtn = document.getElementById('back-btn');

let wishlist = new Set();
let sets = new Set();
let packs = new Set();

function parseCardStr(card_str) {
  const idx = card_str.lastIndexOf('-');
  return {
    set_id:     card_str.slice(0, idx),
    set_number: parseInt(card_str.slice(idx + 1), 10),
  };
}

function countPacks(cards, packs) {
  const counts = {};
  for (let pack of packs) {
    counts[pack] = 0;
  }

  for (let card of cards) {
    const pack = card.pack && counts.hasOwnProperty(card.pack)
      ? card.pack
      : "Unknown";

    counts[pack] += 1;
  }
  return counts;
}

function backToSets() {
  renderSets(wishlist, sets);
}

async function backToPacks(set_id) {
  packs = await getPacks(set_id);
  renderPacks(wishlist, set_id);
}

async function renderSets(wishlist, sets) {
  card_container.innerHTML = '';
  set_table.innerHTML = '';
  pack_table.innerHTML = '';
  backBtn.style.display = 'none';

  set_table.innerHTML = `
    <thead>
      <tr>
        <th>Set</th>
        <th>Your Cards</th>
      </tr>
    </thead>
  `;

  let tbody = set_table.querySelector('tbody');
  if (!tbody) {
    tbody = document.createElement('tbody');
    set_table.appendChild(tbody);
  }
  tbody.innerHTML = '';

  const countFor = set_id =>
    Array.from(wishlist)
      .map(parseCardStr)
      .filter(c => c.set_id === set_id)
      .length;

  const rowPromises = [];

  rowPromises.push(Promise.resolve(`
    <tr data-set="all">
      <td>All Sets</td>
      <td>${wishlist.size}</td>
    </tr>
  `));

  // One row per set, with async setName lookup
  for (let set_id of sets) {
    rowPromises.push((async () => {
      const name  = await setName(set_id);
      const count = countFor(set_id);
      return `
        <tr data-set="${set_id}">
          <td>${name}</td>
          <td>${count}</td>
        </tr>
      `;
    })());
  }

  const rows = await Promise.all(rowPromises);
  tbody.insertAdjacentHTML('beforeend', rows.join(''));

  tbody.querySelectorAll('tr[data-set]').forEach(tr => {
    tr.addEventListener('click', async () => {
      const set_id = tr.dataset.set;
      if (set_id === "all") {
        packs = await allPacks();
      }
      else {
        packs = await getPacks(set_id);
      }
      renderPacks(wishlist, set_id);
    });
  });
}

async function renderPacks(wishlist, set_id) {
  card_container.innerHTML = '';
  set_table.innerHTML = '';
  pack_table.innerHTML = '';
  backBtn.style.display = 'block';
  backBtn.onclick = backToSets;

 // 2) Build the subset of wishlist IDs for this set
 let filteredCards;
  if (set_id === 'all') {
    filteredCards = Array.from(wishlist).map(parseCardStr);
  }
  else {
    filteredCards = Array.from(wishlist)
    .filter(id => id.startsWith(set_id + "-"))
    .map(parseCardStr);
  }
  
  const idStrings = filteredCards.map(({ set_id, set_number }) => `${set_id}-${set_number}`);
  const setList = new Set(idStrings);


  // 3) Fetch those card objects (so we know each card.pack)
  const resp = await fetch("/cards/batch", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ cards: filteredCards })
  });
  const cards = await resp.json(); // [{ set_id, set_number, pack, … }, …]

  const packCounts = countPacks(cards, packs);

  // Render table header
  pack_table.innerHTML = `
    <thead>
      <tr><th>Pack</th><th>Your Cards</th></tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = pack_table.querySelector("tbody");

  //All Packs
  const allRow = document.createElement("tr");
  allRow.dataset.pack = "all";
  allRow.innerHTML = `
    <td>All Packs</td>
    <td>${cards.length}</td>
  `;
  allRow.addEventListener("click", () => {
    renderWishlist(setList, set_id);
  });
  tbody.appendChild(allRow);

  //Other packs
    for (let [pack, count] of Object.entries(packCounts)) {
      const tr = document.createElement("tr");
      tr.dataset.pack = pack;
      tr.innerHTML = `
        <td>${pack}</td>
        <td>${count}</td>
      `;
      tr.addEventListener("click", () => {
        const packList = new Set(
          cards
            .filter(c => c.pack === pack)
            .map(c => `${c.set_id}-${c.set_number}`)
        );
        renderWishlist(packList, set_id);
      });
      tbody.appendChild(tr);
    }
  // }
}

async function renderWishlist(filtered, set_id) {
  set_table.innerHTML = '';
  card_container.innerHTML = '';
  pack_table.innerHTML = '';
  backBtn.style.display = 'block';
  backBtn.onclick = async () => await backToPacks(set_id);

  const card_ids = Array.from(filtered).map(parseCardStr);
  const response = await fetch('/cards/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cards: card_ids })
  });
  const cards = await response.json();
  
  for (const card of cards) {
    const div = createCardElem(card);
    const button = createRemoveBtn(card, filtered);
    div.appendChild(button);
    card_container.appendChild(div);
  }
}

//Load wishlist
document.addEventListener("DOMContentLoaded", async () => {
  if (await isSignedIn()) {
    sets = await loadSets();
    wishlist = await loadWishlist();
    renderSets(wishlist, sets);   
  }
  else{
    sessionStorage.setItem('returnTo', window.location.pathname);
    card_container.innerHTML = `
      <div class="wishlist-message">
        Please 
        <a href="signin.html" id="wishlist-signin-link">sign in</a>
        to use wishlist
      </div>
    `;
  }                        // now uses actual Set, not a Promise
});

window.addEventListener("pageshow", async (event) => {
  if (event.persisted) {
    sets = await loadSets();
    wishlist = await loadWishlist();
    renderSets(wishlist, sets);   
  }
});