const signup = async (event) => {

    event.preventDefault();
  
    const username = document.querySelector('#user-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password1-signup').value.trim();
    const passwordConfirm = document.querySelector('#password2-signup').value.trim();
    
    console.log(username)

    if (username && email && password === passwordConfirm) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      console.log(response)
      if (response.ok) {
        document.location.replace(`/users/${username}`);
      } else {
        alert(response.statusText);
      }
    }
};

document.querySelector('#submit').addEventListener('click', signup)
document.querySelector('.signup-form').addEventListener('submit', signup)