import React from 'react';
import { Text } from 'react-native';

class ReportScreen extends React.Component {
    static navigationOptions = {
        title: 'Report',
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
            <Text>Your Reports</Text>
        );
    }
}

export default ReportScreen;