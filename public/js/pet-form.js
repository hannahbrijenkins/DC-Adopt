// function for adding pet

async function newPetForm(event) {
    event.preventDefault();

    const petName = document.querySelector(`#petName`).value.trim();
    const petAge = document.querySelector('#petAge')
    const petInfo = document.querySelector('#petInfo')
    const breed = document.querySelector('#breed')
    const healthCond = document.querySelector('#healthCond')
    const sex = document.querySelector('#sex')
    const neutered = document.querySelector('#neutered')
    const houseTrained = document.querySelector('#houseTrained')

    const response = await fetch('/api/pets', {
        method: 'POST',
        body: JSON.stringify({
            petName,
            petAge,
            petInfo,
            breed,
            healthCond,
            sex,
            neutered,
            houseTrained
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#newPetInfo').addEventListener('submit', newPetForm);