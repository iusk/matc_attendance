const takeAttendance = (attendance, locationId, userId, checkError) => {
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
    }).then((response) => response.json())
    .then((responseJson) => {
        checkError(responseJson);
    }).catch((error) => {
        checkError(error);
        console.warn(error);
    })
}

const checkAttendance = (locationId, callback) => {
    fetch('https://iusk.000webhostapp.com/matc_attendance/checkAttendance.php', {
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
        callback(responseJson)
    }).catch((error) => {
        console.warn(error);
    })
}

const getAttendance = (locationId, setAttendanceRedux) => {
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
        setAttendanceRedux(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

const updateAttendance = (studentId, present, updateAttendanceRedux) => {
    fetch('https://iusk.000webhostapp.com/matc_attendance/updateAttendance.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            studentId: studentId,
            present: present
        })
    }).then((response) => response.text())
    .then((responseJson) => {
        updateAttendanceRedux(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

export { takeAttendance, getAttendance, checkAttendance, updateAttendance }