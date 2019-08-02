import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View
} from 'react-native';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userId = await AsyncStorage.getItem('userId');
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