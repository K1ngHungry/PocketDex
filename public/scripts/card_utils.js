function createCardElem(card) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.img_url}" loading="lazy">`;
    return div;
}

function createWishlistBtn(user_id, card) {
  const button = document.createElement("button");
  button.className = "card-wishlist notin-wishlist";
  button.title = "Wishlist";
  button.textContent = "♥";
  button.addEventListener("click", () => {
    updateWishlist(user_id, card, button);
  });
  return button;
}

function createRemoveBtn(user_id, card) {
  const button = document.createElement("button");
  button.className = "wishlist-remove";
  button.textContent = "✖";
  button.addEventListener("click", async () => {
      await removeFromWishlist(user_id, card);
      wishlist.delete(`${card.set_id}-${card.set_number}`);
      renderWishlist(wishlist);
  });
  return button;
}