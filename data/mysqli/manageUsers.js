const URL = 'https://iusk.000webhostapp.com/matc_attendance/manageUsers.php';

const addUser = (name, email, admin, verified, checkError, addLocationRedux) => {
    const type = 'Add';
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            name: name,
            email: email,
            admin: admin,
            verified: verified,
            year: new Date().getFullYear()
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        addLocationRedux(responseJson, name, email, admin, verified);
        checkError(responseJson, type);
    }).catch((error) => {
        console.warn(error);
    })
}

const updateUser = (id, name, email, admin, checkError, updateLocationRedux) => {
    const type = 'Update';
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            id: id,
            name: name,
            email: email,
            admin: admin
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        updateLocationRedux(responseJson, name, email, admin);
        checkError(responseJson, type);
    }).catch((error) => {
        console.warn(error);
    })
}

const deleteUser = (id, checkError, deleteLocationRedux) => {
    const type = 'Delete';
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            id: id
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        deleteLocationRedux(responseJson);
        checkError(responseJson, type);
    }).catch((error) => {
        console.warn(error);
    })
}

export { updateUser, deleteUser, addUser };