const takeAttendance = (attendance, locationId, userId) => {
    fetch('https://iusk.000webhostapp.com/matc_attendance/takeAttendance.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            attendance: [...attendance], // using the spread operator to encode as array of key value pairs for PHP
            locationId: locationId,
            userId: userId
        })
    }).then((response) => response.text())
    .then((responseJson) => {
        console.log(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

const getAttendance = (locationId) => {
    fetch('https://iusk.000webhostapp.com/matc_attendance/getAttendance.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            locationId: locationId
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
    }).catch((error) => {
        console.warn(error);
    })
}

export { takeAttendance, getAttendance }