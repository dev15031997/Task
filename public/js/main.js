const username = document.getElementById('username')
const house = document.getElementById('house')
const street = document.getElementById('street')
const city = document.getElementById('city')
const pin = document.getElementById('pin')
const state = document.getElementById('state')
const registerBtn = document.getElementById('registerBtn')

// Display UserData
const displayData = (user, address) => {
    let tableBody = document.getElementById('tableBody')
    let userInfo =
        `
                <tr>
                        <td>${user.username}</td>
                        <td>${address.house}</td>
                        <td>${address.street}</td>
                        <td>${address.city}</td>
                        <td>${address.pin}</td>
                        <td>${address.state}</td>
                </tr>
  `
    tableBody.innerHTML += userInfo;
}


// Register User
registerBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const usernameVal = username.value;
    const houseVal = house.value;
    const streetVal = street.value;
    const cityVal = city.value;
    const pinVal = pin.value;
    const stateVal = state.value;

    try {
        const res = await fetch("/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameVal
            })
        });

        const user = await res.json()

        const addRes = await fetch('/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                house: houseVal,
                street: streetVal,
                city: cityVal,
                pin: pinVal,
                state: stateVal,
                userId: user._id
            }),
        });
        const address = await addRes.json();

        displayData(user, address)
        username.value = "";
        house.value = "";
        street.value = "";
        city.value = "";
        pin.value = "";
        state.value = "";
    }
    catch (error) {
        console.log(error)
        alert('Please Register Again')
    }
})





