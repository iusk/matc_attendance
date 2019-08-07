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
        checkError(responseJson, type);
        updateLocationRedux(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

const deleteLocation = (id, name, checkError) => {
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
        checkError(responseJson, type);
    }).catch((error) => {
        console.warn(error);
    })
}

export { updateLocation, deleteLocation };