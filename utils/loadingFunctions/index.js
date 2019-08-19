import { getUserId } from '../../data/asyncStorage';
import { getUserInfo } from '../../data/mysqli/getInfo';
import URL from '../../data/mysqli/loginCheck';

const userLoginFunction = (givenEmail, givenPassword, login) => {
    fetch(URL, {
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

const checkSignedIn = async (saveUserInfo, disableLoadingScreen) => {
    const userId = await getUserId();
    if (userId) {
        getUserInfo(userId, saveUserInfo);
    } else {
        disableLoadingScreen();
    }
};

export { checkSignedIn, userLoginFunction }
