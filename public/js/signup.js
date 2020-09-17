async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#user-email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            console.log('success');
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signupBtn').addEventListener('submit', signupFormHandler);