// function for adding pet

async function newPetForm(event) {
    event.preventDefault();

    const name = document.querySelector(`#petName`).value.trim();
    const age = document.querySelector('#petAge').value.trim();
    const info = document.querySelector('#petInfo').value.trim();
    const breed = document.querySelector('#breed').value.trim();
    const health_conditions = document.querySelector('#healthCond').value.trim();
    const sex = document.querySelector('input[name="gender"]:checked').value.trim();
    let neutered = document.querySelector('#neutered').value.trim();
    let house_trained = document.querySelector('#houseTrained').value.trim();

    if(neutered === 'on') {
        neutered = true;
    } else {
        neutered = false;
    }

    if(house_trained === 'on') {
        house_trained = true;
    } else {
        house_trained = false;
    }

    const response = await fetch('/api/pets/', {
        method: 'POST',
        body: JSON.stringify({
            name,
            age,
            info,
            breed,
            health_conditions,
            sex,
            neutered,
            house_trained
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#newPetInfo').addEventListener('submit', newPetForm);