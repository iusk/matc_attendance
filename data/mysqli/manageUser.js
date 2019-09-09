import domain from './domain';

const URL = domain + 'manageUser.php';

const changePassword = (userId, currentPassword, newPassword, confirmPassword, checkError) => {
    // errorType => 0 - no error, 1 - current password don't match,
    // 2 - new passwords don't match (checked locally), 3 - error from server
    if (newPassword === confirmPassword) {
        const type = 'Change Password';
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                userId: userId,
                currentPassword: currentPassword,
                newPassword: newPassword,
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            checkError(responseJson);
        }).catch((error) => {
            checkError(3);
            console.warn(error);
        })
    } else {
        checkError(2);
    }
}

const registerUser = (username, email, password, confirmPassword, checkError) => {
    // errorType => 0 - Email address already registered and verified,
    // 1 - Email address already registered,
    // 2 - new passwords don't match (checked locally), 3 - Email registered successfully,
    // 4 - error from server
    if (password === confirmPassword) {
        const type='Register User';
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                username: username,
                email: email,
                password: password,
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            checkError(responseJson);
        }).catch((error) => {
            checkError(4);
            console.warn(error);
        })
    } else {
        checkError(2);
    }
} 

const forgotPassword = (username, email, checkError) => {
    // errorType => 0 - Username and Email matched and New password will be sent,
    // 1 - Not matched, 2 - error from server
    const type='Forgot Password';
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            username: username,
            email: email,
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        checkError(responseJson);
    }).catch((error) => {
        checkError(2);
        console.warn(error);
    })
} 

export { changePassword, registerUser, forgotPassword };