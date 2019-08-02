import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { getUserId } from '../../data/asyncStorage';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._checkSignedIn();
    }

    _checkSignedIn = async () => {
        const userId = getUserId();
        this.props.navigation.navigate(userId ? 'Home' : 'Login');
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

export default AuthLoadingScreen;