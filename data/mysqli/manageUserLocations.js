const URL = 'https://iusk.000webhostapp.com/matc_attendance/manageUserLocations.php';

const addLocation = (userId, locationId, addLocationRedux) => {
    const type = 'Add';
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            userId: userId,
            locationId: locationId
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        addLocationRedux(responseJson, userId, locationId);
    }).catch((error) => {
        console.warn(error);
    })
}

const removeLocation = (userId, locationId, removeLocationRedux) => {
    const type = 'Remove';
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            userId: userId,
            locationId: locationId
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        removeLocationRedux(responseJson, locationId);
    }).catch((error) => {
        console.warn(error);
    })
}

export { addLocation, removeLocation };