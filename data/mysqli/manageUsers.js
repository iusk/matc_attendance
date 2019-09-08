import domain from './domain';

const URL = domain + 'manageUsers.php';

const addUser = (name, email, admin, verified, checkError, updateUserRedux) => {
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
        updateUserRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    })
}

const updateUser = (id, name, email, admin, checkError, updateUserRedux) => {
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
        updateUserRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    })
}

const deleteUser = (id, checkError, updateUserRedux) => {
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
        updateUserRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    })
}

const verifyUser = (id, name, email, checkError, updateUserRedux) => {
    const type = 'Verify';
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
            email: email
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        updateUserRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    }) 
}

export { updateUser, deleteUser, addUser, verifyUser };