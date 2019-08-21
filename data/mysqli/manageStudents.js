const URL = 'https://iusk.000webhostapp.com/matc_attendance/manageStudents.php';

const addStudent = (locationId, firstName, lastName, checkError, updateStudentRedux) => {
    const type = 'Add';
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            locationId: locationId,
            firstName: firstName,
            lastName: lastName
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        updateStudentRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    })
}

const updateStudent = (id, locationId, firstName, lastName, checkError, updateStudentRedux) => {
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
            locationId: locationId,
            firstName: firstName,
            lastName: lastName
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        updateStudentRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    })
}

const deleteStudent = (id, locationId, checkError, updateStudentRedux) => {
    const type = 'Delete';
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            id: id,
            locationId: locationId
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        updateStudentRedux(responseJson);
        checkError(type, 0);
    }).catch((error) => {
        checkError(type, 1);
        console.warn(error);
    })
}

export { addStudent, updateStudent, deleteStudent };