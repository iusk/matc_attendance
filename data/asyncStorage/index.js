import { AsyncStorage } from 'react-native';

const signIn = async (responseJson) => {
    await AsyncStorage.setItem('userId', responseJson);
}

const signOut = async () => {
    await AsyncStorage.clear();
}

const getUserId = async () => {
    return await AsyncStorage.getItem('userId');
}

export { signIn, signOut, getUserId };