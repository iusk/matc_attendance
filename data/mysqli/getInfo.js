const getUserInfo = (id, saveUserInfo) => {
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
        saveUserInfo(responseJson, getStudentsInfo);
    }).catch((error) => {
        console.warn(error);
    })
}

const getStudentsInfo = (locationId, saveStudentsInfo) => {
    fetch('https://iusk.000webhostapp.com/matc_attendance/getStudentsInfo.php', {
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
        saveStudentsInfo(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

const getAdminInfo = (setAdminInfoRedux) => {
    fetch('https://iusk.000webhostapp.com/matc_attendance/getAdminInfo.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json())
    .then((responseJson) => {
        setAdminInfoRedux(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

export { getUserInfo, getStudentsInfo, getAdminInfo };