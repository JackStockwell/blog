// Signup handler

const signupHandler = async (event) => {

    event.preventDefault();
  
    const username = document.querySelector('#user-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password1-signup').value.trim();
    const passwordConfirm = document.querySelector('#password2-signup').value.trim();

    if (!username || !email || !password || !passwordConfirm) {
        errorHandle("Must have a Username, Email and Password!")
        return;
    }

    if (password !== passwordConfirm) {
        errorHandle("Passwords must match!")
        return;
    }

    if (username && email && password === passwordConfirm) {
        const response = await fetch('/api/users/create', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/`);
        } else {
            errorHandle(response.statusText);
        }

    }
};