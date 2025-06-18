const galleryBtn = document.getElementById('gallery-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
const loginBtn = document.getElementById('login-btn');

galleryBtn.addEventListener('click', () => {
  window.location.href = "gallery.html";
});
wishlistBtn.addEventListener('click', () => {
  window.location.href = "wishlist.html";
});
loginBtn.addEventListener('click', () => {
  window.location.href = "login.html";
});

