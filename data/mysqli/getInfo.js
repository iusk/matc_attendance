import domain from './domain';

const getUserInfo = (id, saveUserInfo) => {
    fetch(domain + 'getUserInfo.php', {
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
    fetch(domain + 'getStudentsInfo.php', {
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
    fetch(domain + 'getAdminInfo.php', {
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