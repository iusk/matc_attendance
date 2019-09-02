import React from 'react';
import { Text } from 'react-native';

class ForgotPasswordScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text>ForgotPasswordScreen</Text>
        );
    }
}

export default ForgotPasswordScreen;