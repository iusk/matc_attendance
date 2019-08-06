import { AsyncStorage } from 'react-native';

const signIn = async (responseJson, checkSignedIn, saveUserInfo, navigation) => {
    await AsyncStorage.setItem('userId', responseJson);
    checkSignedIn(saveUserInfo, navigation);
}

const signOut = async (navigation) => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
}

const getUserId = async () => {
    return await AsyncStorage.getItem('userId');
}

export { signIn, signOut, getUserId };