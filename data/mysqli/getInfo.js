const getUserInfo = (id, callback) => {
    fetch('https://iusk.000webhostapp.com/matc_attendance/getUserInfo.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        callback(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

const getAdminInfo = (callback) => {
    fetch('https://iusk.000webhostapp.com/matc_attendance/getAdminInfo.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json())
    .then((responseJson) => {
        callback(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

const getUserLocationInfo = (id, callback) => {
    fetch('https://iusk.000webhostapp.com/matc_attendance/getUserLocations.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        callback(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

export { getUserInfo, getAdminInfo, getUserLocationInfo };