async function savePetToProfile(event) {
    event.preventDefault();

    const petID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await
    fetch("/api/pets/add", {
        method: "PUT",
        body: JSON.stringify({
            pet_id: petID
        }),
        headers: {
            'Content-Type':'application/json'
        }
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#savePet').addEventListener('click', savePetToProfile)