// Query Selector

const { post } = require("../../controllers/home-routes")

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
    console.log(post_id)
    const response = await fetch(`/api/users/follow/${username}`, {
        method: 'POST',
        body: JSON.stringify({content}),
        headers: {'Content-Type': 'application/json'},
    })

    
}

const openLogoutModal = async (event) => {
    event.preventDefault();
    const modalLogout = document.querySelector('[data-modal-logout]')
    modalLogout.showModal()
}

const closeLogoutModal = async (event) => {
    event.preventDefault();
    const modalLogout = document.querySelector('[data-modal-logout]')
    modalLogout.close()
}
