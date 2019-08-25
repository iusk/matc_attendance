import domain from './domain';

const takeAttendance = (attendance, locationId, userId, updateAttendanceRedux) => {
    fetch(domain + 'takeAttendance.php', {
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
        updateAttendanceRedux(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

const getAttendance = (locationId, setAttendanceRedux) => {
    fetch(domain + 'getAttendance.php', {
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
    fetch(domain + 'updateAttendance.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            studentId: studentId,
            present: present
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        updateAttendanceRedux(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

export { takeAttendance, getAttendance, updateAttendance }