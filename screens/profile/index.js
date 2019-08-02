import React from 'react';
import { Text } from 'react-native';

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#d00000'
        },
        headerTintColor: '#fefdfa',
        headerTitleStyle: {
            color: '#fefdfa'
        }
    };
    
    render() {
        return (
            <Text>Your Profile!!</Text>
        );
    }
}

export default ProfileScreen;