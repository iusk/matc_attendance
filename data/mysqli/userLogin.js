import domain from './domain';

const userLogin = (givenEmail, givenPassword, login) => {
    fetch(domain + 'loginCheck.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: givenEmail,
            password: givenPassword
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        login(responseJson);
    }).catch((error) => {
        console.warn(error);
    })
};

export default userLogin;