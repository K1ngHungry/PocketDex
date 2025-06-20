const container = document.getElementById('card-container');

let wishlist = new Set();

async function renderWishlist(wishlist) {
  container.innerHTML = '';
  const card_ids = Array.from(wishlist).map(card_id => {
    const [set_id, set_number] = card_id.split('-');
    return { set_id, set_number: parseInt(set_number) };
  });
  const response = await fetch('/cards/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cards: card_ids })
  });
  const cards = await response.json();
  
  for (const card of cards) {
    const div = createCardElem(card);
    const button = createRemoveBtn(card);
    div.appendChild(button);
    container.appendChild(div);
  }
}

//Load wishlist
document.addEventListener("DOMContentLoaded", async () => {
  if (await isSignedIn()) {
    wishlist = await loadWishlist();
    console.log(wishlist);
    renderWishlist(wishlist);   
  }
  else{
    sessionStorage.setItem('returnTo', window.location.pathname);
    container.innerHTML = `
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
    wishlist = await loadWishlist()
    renderWishList();
  }
});