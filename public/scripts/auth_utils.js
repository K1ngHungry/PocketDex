async function signup(username, password) {
    try {
        const res = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            window.location.href = '/signin.html';
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

async function signin(username, password) {
    try {
        const res = await fetch('/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (res.ok) {
            const returnTo = sessionStorage.getItem('returnTo');
            sessionStorage.removeItem('returnTo');
            window.location.href = returnTo || '/index.html';
        } 
        else {
            alert(data.error);
        }
    } catch (err) {
        console.error('Signin failed:', err);
        alert('Something went wrong. Try again.');
    }
}

async function signout() {
  try {
    const res = await fetch('/auth/signout', {
      method: 'POST',
      credentials: 'include'
    });

    if (res.ok) {
      window.location.reload();
    } else {
      const data = await res.json();
      alert(data.error || 'Signout failed');
    }
  } catch (err) {
    console.error('Signout request failed:', err);
    alert('Could not sign out. Try again.');
  }
}

async function isSignedIn() {
  try {
    const res = await fetch('/auth/user', { credentials: 'include' });
    const data = await res.json();
    return data.signedIn === true;
  } catch (err) {
    console.error("Signin check failed:", err);
    return false;
  }
}