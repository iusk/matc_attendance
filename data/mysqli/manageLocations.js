const URL = 'https://iusk.000webhostapp.com/matc_attendance/manageLocations.php';

const addLocation = (name, day, startTime, endTime, checkError, updateLocationRedux) => {
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
            day: day,
            startTime: startTime,
            endTime: endTime,
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        updateLocationRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    })
}

const updateLocation = (id, name, day, startTime, endTime, checkError, updateLocationRedux) => {
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
            day: day,
            startTime: startTime,
            endTime: endTime
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        updateLocationRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    })
}

const deleteLocation = (id, checkError, updateLocationRedux) => {
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
        updateLocationRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    })
}

export { updateLocation, deleteLocation, addLocation };