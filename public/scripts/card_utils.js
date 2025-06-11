function createCardElem(card) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.img_url}" loading="lazy">`;
    if (card.type) {
      div.classList.add(card.type); // e.g., "Fire", "Water", etc.
    }
    else {
      div.classList.add(card.category);
    }
    return div;
}

function createWishlistBtn(card) {
  const button = document.createElement("button");
  button.className = "card-wishlist notin-wishlist";
  button.title = "Wishlist";
  button.textContent = "♥";
  button.addEventListener("click", () => {
    updateWishlist(`${card.setcode}-${card.number}`, button);
  });
  return button;
}

function createRemoveBtn(card) {
  const button = document.createElement("button");
  button.className = "wishlist-remove";
  button.textContent = "✖";
  button.addEventListener("click", () => {
      removeFromWishlist(`${card.setcode}-${card.number}`);
      wishlist.delete(`${card.setcode}-${card.number}`);
      renderWishlist();
  });
  return button;
}