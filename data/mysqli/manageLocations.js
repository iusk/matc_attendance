const addLocation = (name, checkError, addLocationRedux) => {
    const type = 'Add';
    fetch('https://iusk.000webhostapp.com/matc_attendance/manageLocations.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            name: name
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        addLocationRedux(responseJson);
        checkError(responseJson, type);
    }).catch((error) => {
        console.warn(error);
    })
}

const updateLocation = (id, name, checkError, updateLocationRedux) => {
    const type = 'Update';
    fetch('https://iusk.000webhostapp.com/matc_attendance/manageLocations.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            id: id,
            name: name
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        updateLocationRedux(responseJson);
        checkError(responseJson, type);
    }).catch((error) => {
        console.warn(error);
    })
}

const deleteLocation = (id, checkError, deleteLocationRedux) => {
    const type = 'Delete';
    fetch('https://iusk.000webhostapp.com/matc_attendance/manageLocations.php', {
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

export { updateLocation, deleteLocation, addLocation };