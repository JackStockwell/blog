const followUser = async (event) => {

    event.preventDefault();

    const username = document.querySelector('#username-handle').getAttribute("data-username")
    console.log(username)

    const response = await fetch(`/api/users/follow/${username}`)

}