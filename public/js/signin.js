async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#loginUser').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#loginBtn').addEventListener('submit', loginFormHandler);