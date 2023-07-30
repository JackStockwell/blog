// Query Selector

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
            const alertEl = document.querySelector('.alert').textContent = "Incorrect Email or Password!"
        }
    }
}

const handleLogout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        document.location.replace('/login')
    } else {
        document.location.replace('/login')
    }
}

const newPost = async (event) => {

    event.preventDefault();

    const content = document.querySelector('[data-post-text]').value.trim();
    
    if (content.length < 1) {
        return
    }

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({content}),
        headers: {'Content-Type': 'application/json'},
    })

    switch (response.status) {
        case 200:
            window.location.reload();
            break;
        case 401:
            const alert = document.querySelector('[data-alert]')
            alert.classList.add("slide")
            document.querySelector('[data-alert-text]').innerHTML = response.statusText
            setTimeout(() => {alert.classList.remove('slide')}, 4900)

        default:
            break;
    }
} 

const followUser = async (event) => {

    event.preventDefault();

    const username = document.querySelector('#username-handle').getAttribute("data-username")

    const response = await fetch(`/api/users/follow/${username}`, {
        method: 'POST',
        body: JSON.stringify({username}),
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        console.log("You're now following this user")
    } else {
        alert("Something went wrong..")
    }
}

const newComment = async (event) => {
    event.preventDefault();

    const content = document.querySelector('[data-post-text]').value.trim();
    const post_id = document.querySelector('[data-post-id]').getAttribute('data-post-id')

    const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({content, post_id}),
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        window.location.reload();
    }

}

// MODAL

// Login Modal
const openLoginModal = async (event) => {
    event.preventDefault();
    const modalLogin = document.querySelector('[data-modal-login]')
    modalLogin.showModal()
}

const closeLoginModal = async (event) => {
    event.preventDefault();
    const modalLogin = document.querySelector('[data-modal-login]')
    modalLogin.close()
}

// Logout Modal
const openLogoutModal = async (event) => {
    console.log("test")
    event.preventDefault();
    const modalLogout = document.querySelector('[data-modal-logout]')
    modalLogout.showModal()
}

const closeLogoutModal = async (event) => {
    event.preventDefault();
    const modalLogout = document.querySelector('[data-modal-logout]')
    modalLogout.close()
}
