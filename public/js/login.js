// Login Handler

const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-box').value.trim();
    const password = document.querySelector('#password-box').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            const alertEl = document.querySelector('.alert')
            alertEl.value = "Incorrect Email or Password!"
        }
    }
}

// Signup handler

const signupHandler = async (event) => {

    event.preventDefault();
  
    const username = document.querySelector('#user-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password1-signup').value.trim();
    const passwordConfirm = document.querySelector('#password2-signup').value.trim();

    if (username && email && password === passwordConfirm) {
        const response = await fetch('/api/users/create', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/`);
        } else {
            alert(response.statusText);
        }

    } else if (password !== passwordConfirm) {
        alert("Passwords must match!")
    }
};

const openLoginModal = async (event) => {
    event.preventDefault();
    const modalLogin = document.querySelector('[data-modal-login]')
    console.log(modalLogin)
    modalLogin.showModal()
}