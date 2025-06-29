function showSigninReminder(button) {
  // Avoid duplicating the message
  if (document.getElementById("signin-reminder")) return;

  const message = document.createElement("div");
  message.id = "signin-reminder";
  message.textContent = "Sign in to use wishlist";

  const img = document.createElement("img");
  img.src = "./assets/error.png";
  img.style.width = "20px";
  img.style.height = "20px";
  img.style.paddingRight = "10px";

  message.prepend(img); // add image before text

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 2000);
}

function createCardElem(card) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.img_url}" loading="lazy">`;
    if (card.type) {
      div.classList.add(card.type);
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
  button.addEventListener("click", async () => {
    if (await isSignedIn()) {updateWishlist(card, button);}
    else showSigninReminder();
  });
  return button;
}

function createRemoveBtn(card, filtered) {
  const button = document.createElement("button");
  button.className = "wishlist-remove";
  button.textContent = "✖";
  button.addEventListener("click", async () => {
      await removeFromWishlist(card);
      wishlist.delete(`${card.set_id}-${card.set_number}`);
      filtered.delete(`${card.set_id}-${card.set_number}`);
      renderWishlist(filtered);
  });
  return button;
}