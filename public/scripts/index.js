const galleryBtn = document.getElementById('gallery-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
const signinBtn = document.getElementById('signin-btn');
const signupBtn = document.getElementById('signup-btn');
const signoutBtn = document.getElementById('signout-btn');
const topRight = document.getElementById('top-right')

async function updateButtons() {
  if (await isSignedIn()) {
    topRight.style.display = 'none';
    signoutBtn.style.display = 'flex';
  }
  else {
    topRight.style.display = 'flex';
    signoutBtn.style.display = 'none';
  }
}

galleryBtn.addEventListener('click', () => {
  window.location.href = "gallery.html";
});
signinBtn.addEventListener('click', () => {
  sessionStorage.setItem('returnTo', window.location.pathname);
  window.location.href = "signin.html";
});
signupBtn.addEventListener('click', () => {
  sessionStorage.setItem('returnTo', window.location.pathname);
  window.location.href = "signup.html";
});
signoutBtn.addEventListener('click', () => {
  signout();
});

window.addEventListener("DOMContentLoaded", () => {
  console.log(isSignedIn());
  updateButtons();
});
window.addEventListener("pageshow", (event) => {
  updateButtons();
});

