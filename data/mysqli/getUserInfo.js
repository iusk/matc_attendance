const getUserInfo = (id, callback) => {
    console.log(id);
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
        console.log('inside ' + responseJson);
        callback(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
}

export default getUserInfo;