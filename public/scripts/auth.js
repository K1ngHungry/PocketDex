const signupBtn = document.getElementById('signup-btn');
const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
    window.location.href = "signup.html";
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    signup(username, password);
    });
}

if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    signin(username, password);
    });
}