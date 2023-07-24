// Query Selector

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

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({content}),
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
} 

const followUser = async (event) => {

    event.preventDefault();

    const username = document.querySelector('#username-handle').getAttribute("data-username")
    console.log(username)

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

openLogoutModal = async (event) => {
    event.preventDefault();
    const modalLogout = document.querySelector('[data-modal-logout]')
    modalLogout.showModal()
}

closeLogoutModal = async (event) => {
    event.preventDefault();
    const modalLogout = document.querySelector('[data-modal-logout]')
    modalLogout.close()
}
