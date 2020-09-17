async function removePetFromProfile(event) {
    event.preventDefault();

    const petID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const remove = await fetch(`/api/users/${petID}`, {
        method: `DELETE`,
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace(`/`);
    } else {
        alert(response.statusText);
    }
}

document.querySelector(`#removeBtn`).addEventListener(`click`, removePetFromProfile);