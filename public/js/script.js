// Query Selector

const followUserEle = document.querySelector('#follow-user')

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