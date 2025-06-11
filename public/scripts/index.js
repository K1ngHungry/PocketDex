const galleryBtn = document.getElementById('gallery-btn');
const wishlistBtn = document.getElementById('wishlist-btn');

galleryBtn.addEventListener('click', () => {
  window.location.href = "gallery.html";
});
wishlistBtn.addEventListener('click', () => {
  window.location.href = "wishlist.html";
});

