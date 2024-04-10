window.addEventListener("load", solve);

function solve() {
    const baseURL = 'http://localhost:3030/jsonstore/tasks'

    const loadBtnElement = document.getElementById('load-vacations');
    const vacationsListElement = document.getElementById('list');
    const addBtnElement = document.getElementById('add-vacation');
    const editBtnElement = document.getElementById('edit-vacation');
    const [nameElement, daysElement, dateElement] = document.getElementsByTagName('input');

    let vacationId;

    const vacationsLoad = async () => {
        const response = await fetch(baseURL);
        const vacations = await response.json();

        vacationsListElement.innerHTML = ''


        for (const vacation of Object.values(vacations)) {

            const divElement = document.createElement('div');
            divElement.classList.add('container')
            divElement.innerHTML = `
            <h2>${vacation.name}</h2>
            <h3>${vacation.date}</h3>
            <h3>${vacation.days}</h3>`

            const changeBtn = document.createElement('button')
            changeBtn.classList.add('change-btn')
            changeBtn.textContent = 'Change'
            changeBtn.addEventListener('click', () => {
                nameElement.value = vacation.name;
                daysElement.value = vacation.days;
                dateElement.value = vacation.date;
                vacationId = vacation._id;
                addBtnElement.disabled = true;
                editBtnElement.disabled = false;
                divElement.remove()
                console.log(vacationId);
            })
            const doneBtn = document.createElement('button')
            doneBtn.classList.add('done-btn')
            doneBtn.textContent = 'Done'
            doneBtn.addEventListener('click', () => {
                fetch(`${baseURL}/${vacation._id}`, {
                    method: 'DELETE'
                });

                vacationsLoad();
            })
            divElement.appendChild(changeBtn);
            divElement.appendChild(doneBtn);
            vacationsListElement.appendChild(divElement);

        }
    }

    loadBtnElement.addEventListener('click', vacationsLoad)

    addBtnElement.addEventListener('click', async () => {

        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name: nameElement.value,
                days: daysElement.value,
                date: dateElement.value,
            })
        })

        if (!response.ok) {
            return;
        }
        clearInputData();
        vacationsLoad();
    })
    editBtnElement.addEventListener('click', async () => {
        const response = await fetch(`${baseURL}/${vacationId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name: nameElement.value,
                days: daysElement.value,
                date: dateElement.value,
                _id: vacationId,
            })
        })
        if (!response.ok) {
            return;
        }
        addBtnElement.disabled = false;
        editBtnElement.disabled = true;
        clearInputData();
        vacationsLoad();
    })
    function clearInputData() {
        nameElement.value = '';
        daysElement.value = '';
        dateElement.value = '';
    }
}