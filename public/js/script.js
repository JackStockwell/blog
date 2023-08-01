// Error handler

const errorHandle = (errorText) => {
    const alert = document.querySelector('[data-alert]')
    alert.classList.add("slide")
    document.querySelector('[data-alert-text]').innerHTML = errorText
    setTimeout(() => {alert.classList.remove('slide')}, 4900)
}


// Login Handler
const loginHandler = async (event) => {
    event.preventDefault();
    // Query selector for values to parse as the body for the fetch API
    const email = document.querySelector('#email-box').value.trim();
    const password = document.querySelector('#password-box').value.trim();

    // Ensure
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        closeLogoutModal()
        if (response.ok) {
            document.location.replace('/')
        } else {
            document.querySelector('.alert').textContent = response.statusText
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
    // Query selector for values to parse as the body for the fetch API
    const content = document.querySelector('[data-post-text]').value.trim();
    
    if (content.length < 1) {
        return
    }

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({content}),
        headers: {'Content-Type': 'application/json'},
    })
    // Error handling
    if (response.ok) {
        window.location.reload();
    } else {
        errorHandle(response.statusText)
    }
}


// Function that creates a new comment.
const newComment = async (event) => {
    event.preventDefault();

    // Query selector for values to parse as the body for the fetch API
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

// Function for handling the edit of a post.
const handleEdit = async (event) => {
    event.preventDefault();
    // Query selector for values to parse as the body for the fetch API
    const content = document.querySelector('[data-content-edit]').value.trim()
    const id = document.querySelector('[data-edit-id]').getAttribute('data-edit-id')

    if (!content) {
        errorHandle("Your post must contain content!")
        return
    }

    // Fetch API request.
    const response = await fetch(`/api/posts`, {
        method: 'PUT',
        body: JSON.stringify({id, content}),
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        closeEditModal(event)
    } else {
        alert("Something went wrong..")
    }


}

const deleteEdit = async (event) => {
    event.preventDefault()

    const id = document.querySelector('[data-edit-id]').getAttribute('data-edit-id')

    const response = await fetch(`/api/posts`, {
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        closeEditModal(event)
    } else {
        errorHandle(response.statusText)
    }
}

// Back Button
const backBtn = async () => {
    window.history.back()
}

// MODAL

// Open Login Modal
const openLoginModal = async (event) => {
    event.preventDefault();
    const modalLogin = document.querySelector('[data-modal-login]')
    modalLogin.showModal()
}
// Closes the login modal
const closeLoginModal = async (event) => {
    event.preventDefault();
    const modalLogin = document.querySelector('[data-modal-login]')
    modalLogin.close()
}

// Logout Modal
// Opens the modal
const openLogoutModal = async (event) => {
    event.preventDefault();
    const modalLogout = document.querySelector('[data-modal-logout]')
    modalLogout.showModal()
}
// Closes the modal
const closeLogoutModal = async (event) => {
    event.preventDefault();
    const modalLogout = document.querySelector('[data-modal-logout]')
    modalLogout.close()
}

// Edit Modal, parses the post id into the modal data-html.
// Opens the modal
const openEditModal = async (event) => {
    event.preventDefault();
    // LogoutModal element
    const modalLogout = document.querySelector('[data-modal-edit]')
    
    // Sets the modal element id.
    const id = event.target.closest('[data-post-id]').getAttribute('data-post-id')
    modalLogout.setAttribute('data-edit-id', id)

    // Sets the textContent of the textarea to the text already in the post.
    const postContent = event.target.closest('[data-post-id]').getElementsByClassName('post-p')[0].textContent
    modalLogout.firstElementChild.getElementsByClassName('edit-box')[0].textContent = postContent

    modalLogout.showModal()
}
// Closes the modal 
const closeEditModal = async (event) => {
    event.preventDefault();
    const modalLogout = document.querySelector('[data-modal-edit]')
    modalLogout.close()
    window.location.reload()
}