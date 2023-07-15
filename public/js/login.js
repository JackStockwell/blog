// Query Selector

const loginBtn = document.querySelector('.btn')

// Login Handler

const loginHandler = async (event) => {
    event.preventDefault();

    console.log("Login Handler")

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