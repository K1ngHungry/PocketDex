const homeBtn = document.getElementById('home-btn');
const galleryBtn = document.getElementById('gallery-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
const signoutBtn = document.getElementById('signout-btn');
const profileIcon = document.getElementById('profile-icon');
const profileDropdown = document.getElementById('profile-dropdown');
const dropUser = document.getElementById('drop-user');
const dropSignout = document.getElementById('drop-signout');
const navSignin = document.getElementById('nav-signin');

(async () => {
  if (profileIcon && profileDropdown) {
    profileIcon.addEventListener('click', () => {
      profileDropdown.classList.toggle('show');
    });

    window.addEventListener('click', (e) => {
      if (!profileDropdown.contains(e.target) && e.target !== profileIcon) {
        profileDropdown.classList.remove('show');
      }
    });
    if (await isSignedIn()) {
      profileIcon.style.display = "block";
      navSignin.style.display = "none";
      const resp = await fetch('/auth/user', {
        method: 'GET',
        credentials: 'include'
      });
      const user = await resp.json();
      console.log(user);
      dropUser.textContent = user.username;
    }
    else {
      profileIcon.style.display = "none";
      navSignin.style.display = "block";
    }
  }

  if (navSignin) {
    navSignin.addEventListener('click', async () => {
      sessionStorage.setItem('returnTo', window.location.pathname);
      window.location.href = "signin.html";
    });
  }

  if (dropSignout) {
    dropSignout.addEventListener('click', async () => {
      await signout();
      window.location.reload();
    });
  }

  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      window.location.href = "index.html";
    });
  }
  if (galleryBtn) {
    galleryBtn.addEventListener('click', () => {
      window.location.href = "gallery.html";
    });
  }
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      window.location.href = "wishlist.html";
    });
  }
  if (signoutBtn) {
    signoutBtn.addEventListener('click', () => {
      signout();
    });
  }
})();