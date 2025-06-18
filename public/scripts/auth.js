const registerBtn = document.getElementById('register-btn');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
    window.location.href = "register.html";
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    register(username, password);
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent form from reloading the page

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    login(username, password);
    });
}