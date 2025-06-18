async function register(username, password) {
    try {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Registration successful!');
            window.location.href = '/login.html';
        } 
        else {
            alert(data.error);
        }
    } 
    catch (err) {
        console.error('Registration failed:', err);
        alert('Something went wrong. Try again.');
    }
}

async function login(username, password) {
    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Login successful!');
            window.location.href = '/index.html';
        } 
        else {
            alert(data.error);
        }
    } catch (err) {
        console.error('Login failed:', err);
        alert('Something went wrong. Try again.');
    }
}

async function logout() {
  try {
    const res = await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (res.ok) {
      //window.location.href = '/login.html';
    } else {
      const data = await res.json();
      alert(data.error || 'Logout failed');
    }
  } catch (err) {
    console.error('Logout request failed:', err);
    alert('Could not log out. Try again.');
  }
}