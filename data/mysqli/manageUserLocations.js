import domain from './domain';

const URL = domain + 'manageUserLocations.php';

const addUserLocation = (userId, locationId, addLocationRedux) => {
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
        addLocationRedux(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

const deleteUserLocation = (userId, locationId, removeLocationRedux) => {
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
        removeLocationRedux(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

export { addUserLocation, deleteUserLocation };