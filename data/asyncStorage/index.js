import { AsyncStorage } from 'react-native';

const signIn = async (responseJson, checkSignedIn, saveUserInfo) => {
    await AsyncStorage.setItem('userId', responseJson.toString());
    checkSignedIn(saveUserInfo);
}

const signOut = async (navigation) => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
}

const getUserId = async () => {
    return parseInt(await AsyncStorage.getItem('userId'), 10);
}

const setDefaultLocationId = async (defaultLocationId, callback=null) => {
    await AsyncStorage.setItem('defaultLocationId', defaultLocationId.toString());
    if (callback !== null) {
        callback();
    }
}

const getDefaultLocationId = async () => {
    return parseInt(await AsyncStorage.getItem('defaultLocationId'), 10);
}

export { signIn, signOut, getUserId, setDefaultLocationId, getDefaultLocationId };