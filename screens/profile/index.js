import React from 'react';
import { Text } from 'react-native';

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    };
    
    render() {
        return (
            <Text>Your Profile!!</Text>
        );
    }
}

export default ProfileScreen;